import React, { Component } from "react"
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom"
import './App.css'

import Home from './components/Home'
import AddProduct from './components/AddProduct'
import Cart from './components/Cart'
import ProductList from './components/ProductList'
//import Search from './components/Search'

import Context from "./Context"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      cart: {},
      products: [],
      featuredProducts: [],
      searchTerm: ''
    }
  }

  getData() {
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => this.setState({ products: data }, () => {this.featuredProducts()}))
  }

  featuredProducts = () => {
    const products = this.state.products
    const newArray = []
    for (let i = 0; i < 4; i++) {
      newArray.push(products[Math.floor(Math.random() * products.length)])
    }
    this.setState({
      featuredProducts: newArray
    })
  }

  componentDidMount() {
    this.getData()
  }

  addProduct = (product, callback) => {
    let products = this.state.products.slice()
    products.push(product)
    this.setState({ products }, () => callback && callback())
  };

  addToCart = cartItem => {
    let cart = this.state.cart
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount
    } else {
      cart[cartItem.id] = cartItem
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart })
  };

  removeFromCart = cartItemId => {
    let cart = this.state.cart
    delete cart[cartItemId]
    localStorage.setItem("cart", JSON.stringify(cart))
    this.setState({ cart })
  };

  clearCart = () => {
    let cart = {}
    localStorage.removeItem("cart")
    this.setState({ cart })
  };

  checkout = () => {
    const cart = this.state.cart

    const products = this.state.products.map(p => {
      if (cart[p.name]) {
        p.stock = p.stock - cart[p.name].amount

        const requestOptions = {
          method: "PUT",
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({...p })
        }

        fetch(`http://localhost:3001/products/${p.id}`, requestOptions)
        .then(res => res.json())
        .then(product => 
          this.setState({product}))
          this.clearCart()
     }
     return p;
   });

    this.setState({ products })
  };

  handleChange = (e) => {
    this.setState({
      searchTerm: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
    })
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout,
          handleChange: this.handleChange
        }}
      >
        <Router ref={this.routerRef}>
          <div className="App">
            <nav
              className="navbar-container"
              role="navigation"
            >
              <div className="navbar-brand hero is-link">
                <b className="navbar-item is-size-4 ">ecommerce</b>
                <label
                  role="button"
                  className="navbar-burger burger"
                  aria-label="menu"
                  aria-expanded="false"
                  data-target="navbarBasicExample"
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ showMenu: !this.state.showMenu })
                  }}
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </label>
              </div>
              <div className={`navbar-menu ${this.state.showMenu ? "is-active" : ""
                }`}>
                <Link to="/home" className="navbar-item">Home</Link>
                <Link to="/products" className="navbar-item">
                  Products
                </Link>
                  <Link to="/add-product" className="navbar-item">
                    Add Product
                  </Link>
                <Link to="/cart" className="navbar-item">
                  Cart
                  <span
                    className="tag is-primary"
                    style={{ marginLeft: "5px" }}
                  >
                    {Object.keys(this.state.cart).length}
                  </span>
                </Link>
                
              </div>
            </nav>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/products" component={ProductList} />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    )
  }
}