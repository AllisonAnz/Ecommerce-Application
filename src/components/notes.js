return newArray.map((product, index) => (
    <ProductItem
        product={product}
        key={index}
        addToCart={this.props.context.addToCart} />
))

