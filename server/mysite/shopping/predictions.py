import operator

from statsmodels.tsa.arima_model import ARIMA
from models import User, UserData, ProductInstances, ShoppingList


MINIMUM_LISTS_FOR_USER = 10


def get_user_data_for_user(usr):
    return UserData.objects.get(user=usr)


def get_similar_users(user_id):
    current_user = User.objects.get(id=user_id)
    current_user_data = get_user_data_for_user(current_user)
    all_users = User.objects.all()
    all_users_but_current = [x for x in all_users if x.id != user_id]

    age_differences = [abs((get_user_data_for_user(x).birth_date - current_user_data.birth_date).total_seconds()) for x in all_users_but_current]
    min_age_diff = min(age_differences)
    max_age_diff = max(age_differences)
    diff_range = (max_age_diff - min_age_diff) if (max_age_diff - min_age_diff) else 1
    user_ranking = {}
    for user in all_users_but_current:
        user_data = get_user_data_for_user(user)
        user_ranking[user.id] = (abs((user_data.birth_date - current_user_data.birth_date).total_seconds()) - float(min_age_diff)) / diff_range
        if user_data.relationship != current_user_data.relationship:
            user_ranking[user.id] += 1

        if user_data.gender != current_user_data.gender:
            user_ranking[user.id] += 1

    sorted_uids = [x[0] for x in sorted(user_ranking.items(), key=operator.itemgetter(1))]
    return sorted_uids


def get_list_for_user(user_id):
    user_lists = ShoppingList.objects.all().filter(user=user_id)
    if len(user_lists) >= MINIMUM_LISTS_FOR_USER:
        return user_lists
    # If we're not at the threshold, look for similar user who has more data
    similar_ids = get_similar_users(user_id)
    if not similar_ids:
        return user_lists

    for similar_user_id in similar_ids:
        user_lists = ShoppingList.objects.all().filter(user=similar_user_id)
        if len(user_lists) >= MINIMUM_LISTS_FOR_USER:
            return user_lists
    return user_lists


def aggregate_data(user_id, product_id):
    '''
    Aggregates data for specific product given a user id, used for prediction
    :param user_id: Desired user id
    :param product_id: Product id to be examined
    :return: Dataframe containing the data sliced by timeframe
    '''
    user_lists = get_list_for_user(user_id)
    users_products = ProductInstances.objects.all().filter(
        shopping_list__in=user_lists, product_id=product_id)
    content = []
    for single_list in user_lists:
        product_for_date = [x for x in users_products if
                            x.shopping_list.id == single_list.id]
        content.append(
            float(product_for_date[0].amount) if product_for_date else float(0))
    return content
    # URLS - https://stackoverflow.com/questions/11697887/converting-django-queryset-to-pandas-dataframe
    #  https://machinelearningmastery.com/arima-for-time-series-forecasting-with-python


def predict_single_product(user_id, product_id):
    data = aggregate_data(user_id, product_id)
    if len(set(data)) < 2:  # 0 or 1
        return data[0]
    model = ARIMA(data, order=(1, 0, 0))
    model_fit = model.fit(disp=0)
    output = model_fit.forecast()
    return output[0][0]