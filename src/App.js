import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import commerce from './lib/commerce';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Checkout from './components/Checkout/Checkout';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

function App(){
    // Backdrop 
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleBackDropClose = () => {
        setOpen(false);
    };
    const handleBackDropToggle = () => {
        setOpen(!open);
    };

    // Product and Cart
    const [products, setProducts] = React.useState([]);
    const [cart, setCart] = React.useState({});

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async () => {
        handleBackDropToggle();
        const data = await commerce.cart.retrieve();
        setCart(data);
        handleBackDropClose();
    }

    const addToCart = async (productId, quantity) => {
        handleBackDropToggle();
        const response = await commerce.cart.add(productId, quantity);
        setCart(response.cart);
        handleBackDropClose();
    }

    const updateCartItemQty = async (line_item_id, quantity) => {
        handleBackDropToggle();
        const response = await commerce.cart.update(line_item_id, {quantity});
        setCart(response.cart);
        handleBackDropClose();
    }

    const removeItemFromCart = async (line_item_id) => {
        handleBackDropToggle();
        const response = await commerce.cart.remove(line_item_id);
        setCart(response.cart);
        handleBackDropClose();
    }

    const emptyCart = async () => {
        handleBackDropToggle();
        const response = await commerce.cart.empty();
        setCart(response.cart);
        handleBackDropClose();
    }
    
    const processCheckout = async () => {

    }

    React.useEffect(()=>{
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <BrowserRouter>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Switch>
                    <Route exact path="/">
                        <Products products={products} addToCart={addToCart} />
                    </Route>
                    <Route exact path="/cart">
                        <Cart cart={cart} updateCartItemQty={updateCartItemQty} removeItemFromCart={removeItemFromCart} emptyCart={emptyCart} />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout cart={cart} />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App;