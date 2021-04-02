import React from 'react';
import Grid from '@material-ui/core/Grid';
import Product from './Product/Product';

function Products({ products }){
    return (
        <main>
            <Grid container spacing={4}>
                {products.map(product => (
                    <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products;