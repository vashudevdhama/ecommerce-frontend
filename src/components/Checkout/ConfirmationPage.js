import { Button, CircularProgress, Divider, Typography } from '@material-ui/core'
import React from 'react';
import {Link} from 'react-router-dom';

export default function ConfirmationPage({order}) {
    return(
        order.customer ? 
        (
            <>
                <div>
                    <Typography variant="h5">Thank you for your purchase.</Typography>
                    <Divider />
                    <Typography>Order Ref:</Typography>
                </div>
                <br />
                <Button component={Link} to="/" variant="outlined" type="button">Bact TO Home</Button>
            </>
        ):
        (
            <div>
                <CircularProgress />
            </div>
        )
    )
}
