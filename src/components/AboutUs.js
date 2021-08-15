import React, { Component } from 'react'
import Context from "../Context"
//import ProductItem from "./ProductItem"

class AboutUs extends Component {
    //We set ContextType to the Context Object we Created 
    static contextType = Context
    
    constructor(props) {
        super(props)
        this.state = {
            products: {}
        }
    }

    componentDidMount() {
        const context = this.context
        this.setState({products: context.products})
    }

    
    render(){
        const {products} = this.state
        return (
            <>
        <div className="hero is-primary">
            <div className="hero-body container">
                <h4 className="title">About Us</h4>
            </div>
        </div>
        <br />
            <div className="container">
                        {products && products.length ? (
                            products.map((product, index) => (
                                <div className=" column is-half">
                                    <div className="box">
                                        <div className="media">
                                            <div className="media-left">
                                                <figure className="image is-96x96">
                                                    <img
                                                        src={product.img}
                                                        alt={product.shortDesc}
                                                    />
                                                </figure>
                                            </div>
                                            <div className="media-content">
                                                <b style={{ textTransform: "capitalize" }}>
                                                    {product.name}{" "}
                                                    <span className="tag is-info">${product.price}</span>
                                                </b>
                                                <div>{product.shortDesc}</div>
                                                {product.stock > 0 ? (
                                                    <small>{product.stock + " Available"}</small>
                                                ) : (
                                                    <small className="has-text-danger">Out Of Stock</small>
                                                )}
                                                <div className="is-clearfix">
                                                    <button
                                                        className="button is-small is-primary   is-pulled-right"
                                                        onClick={() =>
                                                            this.context.addToCart({
                                                                id: product.name,
                                                                product,
                                                                amount: 1
                                                            })
                                                        }
                                                    >
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="column">
                                <span className="title has-text-grey-light">
                                    No products found!
                                </span>
                            </div>
                        )}
                   
            </div>
            
        </>
        )}
}

export default AboutUs

