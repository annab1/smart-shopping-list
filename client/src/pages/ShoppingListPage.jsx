import React, {Component} from "react";
import { inject, observer } from "mobx-react";
import ShoppingListItem from "../components/ShoppingListItem";
import Autocomplete from "react-autocomplete"
import cn from "classnames";

@inject("shoppingListViewStore")
@observer
class ShoppingListPage extends Component {

  constructor(props) {
    super(props);

    this.onProductClicked = this.onProductClicked.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
    this.renderAutocompleteItem = this.renderAutocompleteItem.bind(this);
    this.state = { matchingProducts: [] , searchValue: "" };
  }

  render() {
    const { shoppingListViewStore } = this.props;

    if (!shoppingListViewStore.currentShoppingList) {
      //TODO - spinner
      return null;
    }

    return (
      <div className="content-panel">
        <h1 className="title">Shopping List</h1>

        <ul className="">
          { shoppingListViewStore.currentShoppingList.products.map(
            listProduct =>
              <li className="list-item" key={listProduct.product.name}>
                <ShoppingListItem product={listProduct.product}/>
              </li>
          ) }
        </ul>

        <section className="add-product-section">
          <Autocomplete items={this.state.matchingProducts}
                        wrapperProps={({className: "input-wrapper"})}
                        inputProps={({placeholder: "Search for product"})}
                        renderItem={this.renderAutocompleteItem}
                        value={this.state.searchValue}
                        getItemValue={item => item.name}

                        onChange={this.searchProducts}/>
          <button className="btn action-btn"
                  onClick={this.addPro}>Add</button>
        </section>
      </div>
    );
  }

  renderAutocompleteItem(item, isHighlighted) {
    return (<div className={cn("autocomplete-item", { "highlighted" : isHighlighted})}>
      {item.name}
    </div>);
  }

  addPro() {
    const { shoppingListViewStore } = this.props;
    shoppingListViewStore.addProduct();
  }

  onProductClicked() {

  }

  searchProducts(e) {
    const { shoppingListViewStore } = this.props;
    let searchValue = e.target.value;
    shoppingListViewStore.getProducts(searchValue).then(products =>
      this.setState({ matchingProducts: products, searchValue: searchValue })
    );
  }
}

export default ShoppingListPage;