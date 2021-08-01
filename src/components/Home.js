
import React, {Component} from 'react'
import withContext from '../withContext'
import ProductItem from "./ProductItem";

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            featuredProducts : [],
            products: this.props.context.products
        }
    }

    componentDidMount() {
        const products = this.state.products
        const newArray = []
        for(let i = 0; i < 4; i++){
            newArray.push(products[Math.floor(Math.random()*products.length)])
        }
        this.setState({
            featuredProducts: newArray
        })
    }

    featuredProducts() {
       return this.state.featuredProducts && this.state.featuredProducts.length ?
       (this.state.featuredProducts.map((product, index) => (
            <ProductItem
                product={product}
                key={index}
                addToCart={this.props.context.addToCart} />
        ))) : null 
    }


    render(){
        return (
            <>
            <div className="hero is-primary">
                <div className="hero-body container">
                    <h4 className="title">Home</h4>
            </div>
             </div>
            <div className="container">
                <h4 className="is-size-4">Featured Products</h4>
                <div className="column columns is-multiline">
                {this.featuredProducts()}
                </div>
            </div>
                   
            </>
        )
    }
}


export default withContext(Home);
