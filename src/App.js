import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';
import commerce from './lib/commerce';

function App(){

    const [products, setProducts] = React.useState([]);

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        console.log(data);
        setProducts(data);
    }
    
    React.useEffect(()=>{
        fetchProducts();
        console.log(products);
    }, []);

    return (
        <div>
            <Navbar />
            <Products products={products} />
        </div>
    )
}

export default App;