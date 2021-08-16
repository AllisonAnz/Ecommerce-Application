import React from 'react'

const Quantity = (props) => {
    if (props.qty > 2) {
        return <small>{props.qty + " Available"}</small>
    } else if (props.qty <= 2 && props.qty > 0) {
        return <small>ONLY {props.qty} LEFT!!</small>
    } else if (props.qty === 0) {
        return <small className="has-text-danger">Out Of Stock</small>
}}

export default Quantity