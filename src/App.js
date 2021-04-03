import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';
import commerce from './lib/commerce';

function App(){

    const [products, setProducts] = React.useState([]);
    const [cart, setCart] = React.useState({});

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async () => {
        const data = await commerce.cart.retrieve();
        setCart(data);
    }

    const addToCart = async (productId, quantity) => {
        const response = await commerce.cart.add(productId, quantity);
        setCart(response.cart);
    }

    const updateCartItemQty = async (line_item_id, quantity) => {
        const response = await commerce.cart.update(line_item_id, {quantity});
        setCart(response.cart);
    }

    const removeItemFromCart = async (line_item_id) => {
        const response = await commerce.cart.remove(line_item_id);
        setCart(response.cart);
    }

    const emptyCart = async () => {
        const response = await commerce.cart.empty();
        setCart(response.cart);
    }
    
    React.useEffect(()=>{
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <div>
            <Navbar />
            <Products products={products} />
        </div>
    )
}

export default App;