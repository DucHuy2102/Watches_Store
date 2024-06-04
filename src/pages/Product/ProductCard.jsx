import CardItem_Product from './CardItem_Product';

const ProductCard = ({ products }) => {
    return (
        <>
            {products.map((product) => (
                <CardItem_Product key={product.id} product={product} />
            ))}
        </>
    );
};

export default ProductCard;
