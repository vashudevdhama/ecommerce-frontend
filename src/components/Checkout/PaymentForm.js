import React from 'react';
import { Typography, List, ListItem, ListItemText, Button, Divider, CssBaseline } from '@material-ui/core';
import { loadStripe } from '@stripe/stripe-js';
import { makeStyles } from '@material-ui/core';
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';

const useStyles = makeStyles((theme) => ({
    layout: {
        marginTop: '1%',
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
                    <ListItem disablePadding key={product.name}>
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

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY);

function PaymentForm({ checkoutToken, backStep, addressData, processCaptureCheckout, nextStep }){
    const classes = useStyles();
    console.log(addressData);
    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();
        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement});

        if(error){
            console.log(error)
        } else{
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: {
                    firstname: addressData.firstname, 
                    lastname: addressData.lastname,
                    email: addressData.email,
                    phone: addressData.phone
                },
                shipping: {
                    name: 'Primary',
                    street: addressData.address1,
                    town_city: addressData.city,
                    county_state: addressData.shippingState,
                    postal_zip_code: addressData.pincode,
                    country: addressData.shippingCountry
                },
                fulfillment: {
                    shipping_method: addressData.shippingOption
                },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                }
            }

            processCaptureCheckout(checkoutToken.id, orderData);
            nextStep();
        }

    }

    return (
        <>
            <main className={classes.layout}>
                <Review checkoutToken={checkoutToken}/>
                <Divider />
                <Typography variant="h6" gutterBottom style={{margin: "20px 0px"}}>Payment method</Typography>
                <Elements stripe={stripePromise}>
                    <ElementsConsumer>
                        {({elements, stripe})=>(
                            <form onSubmit={(e)=>handleSubmit(e, elements, stripe)}>
                                <CardElement />
                                <br/>
                                <br />
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Button variant="outlined" onClick={backStep}>Back</Button>
                                    <Button type="submit" variant="contained" color="primary" disables={!stripe}>
                                        Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </ElementsConsumer>
                </Elements>
            </main>
        </>
    )
}

export default PaymentForm;