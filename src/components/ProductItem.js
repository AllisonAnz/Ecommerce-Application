import React from "react"

const ProductItem = props => {
    const { product } = props
    const searchTerm = props.searchTerm

    if (searchTerm !== ""){
        if (product.name.includes(searchTerm)){
            return (
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
                                    props.addToCart({
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
    )
        } else {
            return null
        }
    }

    return (
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
                                    props.addToCart({
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
    );
};

export default ProductItem