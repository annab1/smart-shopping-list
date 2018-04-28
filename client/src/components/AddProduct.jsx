import React, {Component} from "react";
import {computed} from "mobx/lib/mobx";
import {inject, observer} from "mobx-react/index";
import Autocomplete from "react-autocomplete";
import cn from "classnames";

@inject("shoppingListViewStore")
@observer
class AddProduct extends Component {

  @computed
  get productIdsSet() {
    return this.props.shoppingListViewStore.currentShoppingList.products.reduce((obj,lp) => {
      obj[lp.product.id] = true;
      return obj;
    }, {});
  }

  constructor(props) {
    super(props);

    this.renderAutocompleteItem = this.renderAutocompleteItem.bind(this);
    this.renderAutocompleteMenu = this.renderAutocompleteMenu.bind(this);
    this.onItemSelected = this.onItemSelected.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
    this.state = { matchingProducts: [] , searchValue: "" };
  }

  render() {
    return (
      <section className="add-product-section">
        <Autocomplete items={this.state.matchingProducts}
                      wrapperProps={({className: "input-wrapper"})}
                      inputProps={({placeholder: "Search for product"})}
                      renderItem={this.renderAutocompleteItem}
                      renderMenu={this.renderAutocompleteMenu}
                      onSelect={this.onItemSelected}
                      shouldItemRender={product => !this.productIdsSet[product.id]}
                      value={this.state.searchValue}
                      getItemValue={item => item.name}
                      onChange={this.searchProducts}/>
        <button className="btn action-btn"
                onClick={this.addPro}>Add</button>
      </section>
    );
  }

  renderAutocompleteItem(item, isHighlighted) {
    return (<div className={cn("autocomplete-item", { "highlighted" : isHighlighted})}>
      {item.name}
    </div>);
  }

  renderAutocompleteMenu(items) {
    if (this.state.matchingProducts.length === 0) {
      return <div/>;
    }

    return (<div className="autocomplete-menu" children={items}/>);
  }


  onItemSelected(product, amount) {
    const { shoppingListViewStore } = this.props;
    shoppingListViewStore.addProduct(product, amount);
  }

  searchProducts(e) {
    const { shoppingListViewStore } = this.props;
    let searchValue = e.target.value;
    shoppingListViewStore.getProducts(searchValue).then(products =>
      this.setState({ matchingProducts: products, searchValue: searchValue })
    );
  }
}

export default AddProduct;