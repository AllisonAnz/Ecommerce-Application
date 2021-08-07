
import React from "react"
import ProductItem from "./ProductItem"
import withContext from "../withContext"

const Home = props => {
    const { featuredProducts } = props.context

    return (
        <>
            <div className="hero is-primary">
                <div className="hero-body container">
                    <h4 className="title">Home</h4>
                </div>
            </div>
            <br />
            <div className="container">
                <h4 className="title">Featured Products</h4>
                <div className="column columns is-multiline">
                    {featuredProducts && featuredProducts.length ? (
                        featuredProducts.map((product, index) => (
                            <ProductItem
                                product={product}
                                key={index}
                                addToCart={props.context.addToCart}
                                searchTerm={props.context.searchTerm}
                            />
                        ))
                    ) : (
                        <div className="column">
                            <span className="title has-text-grey-light">
                                No products found!
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default withContext(Home)