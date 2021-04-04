import React from 'react';
import { Card, CardMedia, Button, CardContent, Typography, CardActions, Paper, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CartItem from './CartItem/CartItem';

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: '1%',
    },
    emptyButton: {
        minWidth: '100px',
        [theme.breakpoints.down('xs')]: {
        marginBottom: '5px',
        },
        [theme.breakpoints.up('xs')]: {
        marginRight: '20px',
        },
    },
    checkoutButton: {
        minWidth: '100px',
        marginRight: '20px',
    },
    cardDetails: {
        display: 'flex',
        marginTop: '1%',
        marginBottom: '1%',
        width: '100%',
        justifyContent: 'space-between',
    },
    root: {
      maxWidth: 345,
      margin: 'auto',
    },
    media: {
      height: 140,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    link: {
        textDecoration: 'none',
      }
  }));

function Cart({ cart, updateCartItemQty, removeItemFromCart, emptyCart }){
    const classes = useStyles();
    if (!cart.line_items) return "Loading...";

    const renderCart = (
        <>
            <Typography className={classes.title} variant="h4" gutterBottom>Cart Details</Typography>
            <div className={classes.cardDetails}>
                <Typography variant="h5" component="h2">Total: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.checkoutButton} variant="outlined" color="secondary" component={Link} to="/checkout">Checkout</Button>
                    <Button className={classes.emptyButton} variant="outlined" color="primary" onClick={()=>emptyCart()}>Empty Cart</Button>
                </div>
            </div>
            <div className={classes.content}>
                <Grid container spacing={4}>
                    {cart.line_items.map(line_item => (
                        <Grid key={line_item.id} item xs={12} sm={6} md={4} lg={3}>
                            <CartItem line_item={line_item} updateCartItemQty={updateCartItemQty} removeItemFromCart={removeItemFromCart} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    );

    return (
        <>
            { cart.line_items.length !== 0 ? 
                renderCart 
                : <Typography variant="h5" component="h2">No item in your cart.  
                    <Link to="/" className={classes.link}> Buy some...</Link>
                </Typography>}
        </>
    )
}

export default Cart;