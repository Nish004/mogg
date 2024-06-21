import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrum from '../components/Breadcrums/Breadcrum';
import { ShopContext } from '../context/ShopContext'; // Ensure the correct path to your context file
import ProdutDisplay from '../components/ProductDisplay/ProdutDisplay';

const Product = () => {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams();
    const product = all_product.find((e) => e.id === parseInt(productId));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productId]);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <Breadcrum product={product} />
            <ProdutDisplay product={product} />
        </div>
    );
};

export default Product;
