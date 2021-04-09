import { Button, CircularProgress, CssBaseline, Divider, Typography } from '@material-ui/core'
import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    layout: {
        marginTop: '5%',
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
}))

export default function ConfirmationPage({order, errMsg}) {
    const classes = useStyles();
    if(errMsg){
        return (
            <>
                <main className={classes.layout}>
                    <Typography variant="h5">Error: {errMsg}</Typography>
                    <br/> <br/>
                    <Button component={Link} to="/" variant="outlined" type="button">Bact TO Home</Button>
                </main>
            </>
        )
    }
    console.log(order.customer)
    return(
        order.customer ? 
        (
            <>  
                <main className={classes.layout}>
                    <div>
                        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname}</Typography>
                        <Divider />
                        <Typography>Order Ref: {order.customer_reference}</Typography>
                    </div>
                    <br /> <br />
                    <Button component={Link} to="/" variant="outlined" type="button">Bact To Home</Button>
                </main>
            </>
        ):
        (
            <div>
                <CircularProgress />
            </div>
        )
    )
}
