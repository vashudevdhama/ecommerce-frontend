import React from 'react';
import { Typography, Paper, Stepper, Step, StepLabel, StepContent,Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container:{
        marginTop: '2%',
        marginLeft: '5%',
        marginRight: '5%'
    },
})

const steps = ['Shipping address', 'Payment'];

function Checkout(){
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    // TODO: Make address form
    const ShippingAddress = (
        <h1>Shipping Address</h1>
    )
    // TODO: Make payment form
    const PaymentForm = (
        <h1>Payment form</h1>
    )
    // TODO: Confirmation page
    const ConfirmationPage = (
        <h1>Confirmation Page</h1>
    )

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };

    function getStepContent(step) {
        switch (step) {
          case 0:
            return ShippingAddress;
          case 1:
            return PaymentForm;
          case 2:
            return ConfirmationPage;
          default:
            return 'Some Error Occurred';
        }
      }

    return (
        <main class={classes.container}>
            <Paper >
                <Typography variant="h4" container="h2" gutterBottom>Checkout</Typography>

                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map(step=>(
                        <Step key={step}>
                            {/* Step Heading */}
                            <StepLabel>
                                {step}
                            </StepLabel>
                            {/* Step Content */}
                            <StepContent>
                                <Typography >{getStepContent(activeStep)}</Typography>
                                <div>
                                    <div>
                                    <Button
                                        disabled={step === 0}
                                        onClick={handleBack}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                    >
                                        {step === steps.length - 1 ? "Finish" : "Next"}
                                    </Button>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0}>
                    <Typography>{getStepContent(activeStep)}</Typography>
                    <Button 
                        variant="contained"
                        color="primary"
                    // onClick={handleReset}
                    >
                        Confirm
                    </Button>
                    </Paper>
                )}
            </Paper>
        </main>
    )
}

export default Checkout;