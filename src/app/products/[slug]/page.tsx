
// Use the defined interface for the component
function Product({ params }: ProductProps) {
    return (
        <div>{params.slug}</div>
    );
}

export default Product;