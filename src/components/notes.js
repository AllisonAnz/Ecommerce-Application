<ul>
    {this.state.products.map((product) => (
        <li key={product.id} product={product}></li>
    ))}
</ul>