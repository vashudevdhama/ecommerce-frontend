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
import CategoryBar from './components/CategoryBar/CategoryBar';

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
    const [categories, setCategories] = React.useState([]);
    const [category, setCategory] = React.useState('');
    const [cart, setCart] = React.useState({});
    const [order, setOrder] = React.useState({});
    const [searchText, setSearchText] = React.useState('');

    const [errMsg, setErrMsg] = React.useState('');

    const fetchProducts = async (category=null) => {
        handleBackDropToggle();
        let { data } = await commerce.products.list();
        
        // Category wise filtering
        if(category){
            const arrayOfProducts = data.map((product)=> {
                const cat = product.categories.map(category=> category.slug)
                return [product, cat];
            })
            const filteredProducts =  arrayOfProducts.filter(p=>{
                if(p[1].includes(category)) return p;
            })
            setProducts(filteredProducts);
        } else{
            setProducts(data);
        }
        handleBackDropClose();
    }

    const fetchCategories = async() => {
        const {data} = await commerce.categories.list();
        setCategories(data);
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
    
    const refreshCart = async() =>{
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    }

    const processCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            console.log(error);
            setErrMsg(error.data.error.message);
        }
    }

    React.useEffect(()=>{
        fetchCategories();
        fetchProducts(category);
    }, [category]);
    React.useEffect(()=>{
        fetchCart();
    }, [])

    return (
        <BrowserRouter>
            <div>
                <Navbar totalItems={cart.total_items} setSearchText={setSearchText} setCategory={setCategory}/>
                <CategoryBar categories={categories} setCategory={setCategory}/>
                <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Switch>
                    <Route exact path="/">
                        <Products products={products} searchText={searchText} addToCart={addToCart} />
                    </Route>
                    <Route exact path="/cart">
                        <Cart cart={cart} updateCartItemQty={updateCartItemQty} removeItemFromCart={removeItemFromCart} emptyCart={emptyCart} />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout cart={cart} order={order} processCaptureCheckout={processCaptureCheckout} errMsg={errMsg}/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App;