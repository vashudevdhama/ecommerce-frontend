import React from 'react';
import { Grid, Typography, TextField, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { useForm, FormProvider, useFormContext, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import commerce from '../../lib/commerce';
import { Link } from 'react-router-dom';


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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    buttons: {
        marginTop: '10px',
        display: 'flex', 
        justifyContent: 'space-between'
    },
}));

function AddressForm({ checkoutToken, processNext }) {
    // Backdrop 
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleBackDropClose = () => {
        setOpen(false);
    };
    const handleBackDropToggle = () => {
        setOpen(!open);
    };


    const methods = useForm();

    const [shippingCountries, setShippingCountries] = React.useState([]);
    const [shippingCountry, setShippingCountry] = React.useState('');
    const [shippingStates, setShippingStates] = React.useState([]);
    const [shippingState, setShippingState] = React.useState('');

    async function fetchShippingCountries(checkoutTokenId){
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }
    
    async function fetchSubdivisions(checkoutTokenId, countryCode){
        const { subdivisions } = await commerce.services.localeListShippingSubdivisions(checkoutTokenId, countryCode);
        setShippingStates(subdivisions);
        setShippingState(Object.keys(subdivisions)[0]);
    }

    React.useEffect(()=>{
        fetchShippingCountries(checkoutToken.id);
    },[])

    React.useEffect(()=>{
        if(shippingCountry) fetchSubdivisions(checkoutToken.id, shippingCountry);
    },[shippingCountry])


    const CustomTextField = ({ name, label }) => {
        const {control} = useFormContext();
        return (
            <Grid item xs={12} sm={6}>
                <Controller 
                    control={control} 
                    name={name}
                    render={({ field }) => <TextField {...field} fullWidth label={label} required />}
                />
            </Grid>
        )
    }

    const SelectShippingCountry = () => {
        // Convert Object of country objects(i.e. shippingCountries) to array of country objects(i.e. countries).
        const countries = Object.entries(shippingCountries).map(([countryCode, countryName]) => ({id: countryCode, label: countryName}));

        return (
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Country</InputLabel>
                    <Select value={shippingCountry} fullWidth onChange={(e)=> setShippingCountry(e.target.value)}>
                        {countries.map(country => (
                                <MenuItem key={country.id} value={country.id}>
                                    {country.label}
                                </MenuItem>
                            ))}
                    </Select>
                </Grid>
        )
    }
    const SelectShippingSubDivision = () => {
        // Convert Object of state objects(i.e. shippingStates) to array of state objects(i.e. states).
        const states = Object.entries(shippingStates).map(([stateCode, stateName]) => ({id: stateCode, label: stateName}));

        return (
            <Grid item xs={12} sm={6}>
                <InputLabel>State</InputLabel>
                <Select value={shippingState} fullWidth onChange={(e)=> setShippingState(e.target.value)}>
                    {states.map(state => (
                            <MenuItem key={state.id} value={state.id}>
                                {state.label}
                            </MenuItem>
                        ))}
                </Select>
            </Grid>
        )
    }


    return (
        <main className={classes.layout}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => processNext({ ...data, shippingCountry, shippingState}))}>
                    <Grid container spacing={3}>
                        <CustomTextField name="fullname" label="Full Name" />
                        <CustomTextField name="email" label="Email" />
                        <CustomTextField name="phone" label="Phone No." />
                        <CustomTextField name="address1" label="Address1" />
                        <CustomTextField name="city" label="City" />
                        <CustomTextField name="pincode" label="Pin code / ZIP" />
                        <SelectShippingCountry />
                        <SelectShippingSubDivision />
                    </Grid>
                    <br/>
                    <div className={classes.buttons}>
                        <Button component={Link} to="/cart" variant="outlined" color="secondary">Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </main>
    )
}

export default AddressForm;