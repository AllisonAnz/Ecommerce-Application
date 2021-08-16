import React, { useState } from "react"
import Quantity from "./Quantity"

const ProductItem = props => {
    const { product } = props
    const searchTerm = props.searchTerm
    const [qty, setQty] = useState(0)

    function increment(qty) {
        return qty + 1
    }

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
                       <div><Quantity qty={product.stock} /></div>
                        <br/>
                         <span>{qty > 0 && qty <= product.stock ? `${qty} in cart` : ''}</span>
                        <div className="is-clearfix">
                            {product.stock !== 0 ? (
                            <button
                                className="button is-small is-primary   is-pulled-right" 
                                    onClick={() => {
                                        props.addToCart({
                                            id: product.name,
                                            product,
                                            amount: 1
                                        }); setQty(increment)
                                    }}>Add To Cart</button>): (<div></div>)}
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
                        <div><Quantity qty={product.stock} /></div>
                        <br/>
                        <span>{qty > 0 && qty <= product.stock ? `${qty} in cart` : ''}</span>
                        <div className="is-clearfix">
                            {product.stock !== 0 ? (
                                <button className="button is-small is-primary   is-pulled-right"
                                    onClick={() => {
                                        props.addToCart({
                                            id: product.name,
                                            product,
                                            amount: 1
                                        }); setQty(increment)
                                    }}>Add To Cart</button>) : (<div></div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem