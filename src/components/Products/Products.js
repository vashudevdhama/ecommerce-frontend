import React from 'react';
import Grid from '@material-ui/core/Grid';
import Product from './Product/Product';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    }
  }));

function Products({ products, addToCart }){
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <Grid container spacing={4}>
                {products.map(product => (
                    product[0] !== undefined 
                        ? <Grid key={product[0].id} item xs={12} sm={6} md={4} lg={3}>
                            <Product product={product[0]} addToCart={addToCart} />
                        </Grid>
                        : <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                            <Product product={product} addToCart={addToCart} />
                        </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products;