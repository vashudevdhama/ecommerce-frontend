import React from 'react';
import { Paper, Typography, Stepper, Step, StepLabel, CircularProgress, Divider, Button } from '@material-ui/core';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import ConfirmationPage from './ConfirmationPage';
import { makeStyles } from '@material-ui/core';
import commerce from '../../lib/commerce';

const useStyles = makeStyles((theme) => ({
    stepper: {
        maxWidth: 650,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}))

const steps = ['Shipping Address', 'Payment details'];

function Checkout({ cart }){
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [checkoutToken, setCheckoutToken] = React.useState(null);
    const [addressData, setAddressData] = React.useState({});

    React.useEffect(() => {
        //Generate Token function needed to have async await in useEffect
        const generateToken = async () => {
            try{
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'});
                setCheckoutToken(token);
            } catch(error){
                console.log(error);
            }
        }

        generateToken();
    }, [cart])

    function nextStep(){
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    function backStep(){
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    function processNext(data){
        console.log(data);
        setAddressData(data);
        nextStep();
    }

    const Form = () => activeStep === 0 ? 
                        <AddressForm checkoutToken={checkoutToken} processNext={processNext}/> : 
                        <PaymentForm checkoutToken={checkoutToken} addressData={addressData}/>

    return (
        <main>
            <Paper>

                <Typography variant="h4" align="center" >Checkout</Typography>

                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map(step=>(
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {/* Form should be render only with valid active step count and checkoutToken */}
                {activeStep === steps.length ? <ConfirmationPage /> : checkoutToken && <Form /> }

            </Paper>
        </main>
    )
}

export default Checkout;