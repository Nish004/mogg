import React from 'react';
import Breadcrum from './Breadcrum';

const SomeParentComponent = () => {
    const product = {
        category: 'Electronics',
        name: 'Smartphone',
    };

    console.log('Product passed to Breadcrum:', {product});  // Log product for debugging

    return (
        <div>
            <Breadcrum product={product} />
            {/* Other components */}
        </div>
    );
};

export default SomeParentComponent;
