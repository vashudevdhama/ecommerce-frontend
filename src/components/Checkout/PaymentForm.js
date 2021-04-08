import React from 'react';
import { Typography, List, ListItem, ListItemText, Button, Divider } from '@material-ui/core';
import { loadStrip } from '@stripe/stripe-js';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    layout: {
        marginTop: '5%',
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    boldText:{
        fontWeight: 700,
        fontSize: "larger",
        marginLeft: "5%"
    }
}));

function Review({ checkoutToken }){
    const classes = useStyles();
    return (
        <>
            <Typography variant="h5" gutterBottom>Order Summary</Typography>
            <List disablePadding>
                {checkoutToken.live.line_items.map((product) => (
                    <ListItem key={product.name}>
                        <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
                        <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ))}
                <ListItem style={{padding: "10px 0px"}}>
                    <ListItemText primary="" className={classes.boldText} />
                    <Typography variant="subtitle1" className={classes.boldText} >Total</Typography>
                    <Typography variant="subtitle1" className={classes.boldText} >{checkoutToken.live.subtotal.formatted_with_symbol}</Typography>
                </ListItem>
            </List>
        </>
    )
}

function PaymentForm({ checkoutToken }){
    const classes = useStyles();

    return (
        <main className={classes.layout}>
            <Review checkoutToken={checkoutToken}/>
        </main>
    )
}

export default PaymentForm;