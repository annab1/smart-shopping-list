import React, {Component} from "react";
import Pages from "../constants/Pages";

class ShoppingListPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        const shoppingListViewStore = this.props.shoppingList;
        return (
            <div>
                Shopping List Page
                <ul>
                    { shoppingListViewStore.shoppingList.map(
                        (name) =>  name={ name },
                        <li>
                            <input
                            type='checkbox'
                            checked={ product.chosen }
                            onChange={ this.onProductClicked }
                            />
                        </li>
                    ) }

                </ul>
                <button onClick={this.addPro}>Add Product</button>
            </div>
        );
    }

    addPro() {
        const { shoppingList } = this.state;
        const { shoppingListViewStore, userViewStore } = this.props;
        shoppingListViewStore.addProduct()
            .then(() => {
                shoppingListViewStore.setCurrentPage(Pages.ShoppingList);
            });
    }
}

export default ShoppingListPage;