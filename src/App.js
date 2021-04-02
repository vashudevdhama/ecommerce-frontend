import React from 'react';
import Products from './components/Products/Products';

function App(){

    const products = [
        {id: 1, name: 'Product 1', desc: 'Description of the product 1', price: 199.99, image: 'https://raw.githubusercontent.com/vashudevdhama/images/master/JetFighting.png'},
        {id: 2, name: 'Product 2', desc: 'Description of the product 2', price: 199.99, image: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg'}
    ]
    

    return (
        <div>
            <Products products={products} />
        </div>
    )
}

export default App;