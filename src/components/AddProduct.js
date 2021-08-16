import React, { Component } from "react"
import withContext from "../withContext"

const initState = {name: "", price: "", stock: "", shortDesc: "", description: "", img: ""}

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = initState
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { name, price, stock, shortDesc, description, img} = this.state
        if (name && price) {
            
        fetch('http://localhost:3001/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name, price, stock, shortDesc, description, img
            })
        })
            .then(res => res.json())
            .then(data => 
                this.props.context.addProduct(data)
                )
                
            this.setState(
                { flash: { status: 'is-success', msg: 'Product created successfully' } }
            )

        } else {
            this.setState(
                { flash: { status: 'is-danger', msg: 'Please enter name and price' } }
            )
        }
        this.setState({ name: "", price: "", stock: "", shortDesc: "", description: "", img: "" })
    }
        

    handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" })
    
    render() {
        const { name, price, stock, shortDesc, description, img } = this.state;
        
        return(
            <>
                <div className="hero is-primary ">
                    <div className="hero-body container">
                        <h4 className="title">Add Product</h4>
                    </div>
                </div>
                <br />
                <br />
                <form onSubmit={this.onSubmit}>
                    <div className="columns is-mobile is-centered">
                        <div className="column is-one-third">
                            <div className="field">
                                <label className="label">Product Name: </label>
                                <input
                                    className="input"
                                    type="text"
                                    style={{ textTransform: "capitalize" }}
                                    name="name"
                                    value={name}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="field">
                                <label className="label">Price: </label>
                                <input
                                    className="input"
                                    type="number"
                                    name="price"
                                    value={price}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="field">
                                <label className="label">Available in Stock: </label>
                                <input
                                    className="input"
                                    type="number"
                                    name="stock"
                                    value={stock}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="field">
                                <label className="label">Short Description: </label>
                                <input
                                    className="input"
                                    type="text"
                                    name="shortDesc"
                                    value={shortDesc}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="field">
                                <label className="label">Description: </label>
                                <textarea
                                    className="textarea"
                                    type="text"
                                    rows="2"
                                    style={{ resize: "none" }}
                                    name="description"
                                    value={description}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="field">
                                <label className="label">Image Link: </label>
                                <textarea
                                    className="input"
                                    type="text"
                                    style={{ resize: "none" }}
                                    name="img"
                                    value={img}
                                    onChange={this.handleChange}
                                />
                            </div>
                            {this.state.flash && (
                                <div className={`notification ${this.state.flash.status}`}>
                                    {this.state.flash.msg}
                                </div>
                            )}
                            <div className="field is-clearfix">
                                <button className="button is-primary is-outlined is-pulled-right" type="submit">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        );
    }
}

export default withContext(AddProduct)