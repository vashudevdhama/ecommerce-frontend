import React from 'react'
import { Card, CardActionArea, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      margin: 'auto',
    },
    media: {
      height: 140,
    },
  });

export default function Product({ product }) {
    const classes = useStyles();
    let description = product.description;
    return (
        <Card className={classes.root}>
            <CardActionArea>
            <CardMedia
                className={classes.media}
                image={product.media.source}
                title={product.name}
            />
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" component="h2">
                        Rs. {product.price.formatted_with_symbol}
                    </Typography>
                    <Typography dangerouslySetInnerHTML={{__html: product.description}} variant="body2" color="textSecondary" component="p">
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton aria-label="Add to Cart">
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}
