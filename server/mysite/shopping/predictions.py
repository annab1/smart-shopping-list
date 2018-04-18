from statsmodels.tsa.arima_model import ARIMA
from models import UserData, ProductInstances, ShoppingList


def aggregate_data(user_id, product_id):
    '''
    Aggregates data for specific product given a user id, used for prediction
    :param user_id: Desired user id
    :param product_id: Product id to be examined
    :return: Dataframe containing the data sliced by timeframe
    '''
    user_lists = ShoppingList.objects.all().filter(user=user_id)
    users_products = ProductInstances.objects.all().filter(shopping_list__in=user_lists, product_id=product_id)
    content = []
    for single_list in user_lists:
        product_for_date = [x for x in users_products if x.shopping_list.id == single_list.id]
        content.append((single_list.date, product_for_date[0].amount) if product_for_date else (single_list.date, 0))
    return content
    # URLS - https://stackoverflow.com/questions/11697887/converting-django-queryset-to-pandas-dataframe
    #  https://machinelearningmastery.com/arima-for-time-series-forecasting-with-python


def predict_single_product(user_id, product_id):
    data = aggregate_data(user_id, product_id)
    model = ARIMA(data, order=(5, 1, 0))
    model_fit = model.fit(disp=0)
    output = model_fit.forecast()
    return output[0]
