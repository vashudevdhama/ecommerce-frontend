import React from 'react';
import { Card, CardMedia, Button, CardContent, Typography, CardActions } from '@material-ui/core';
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

function CartItem({ line_item, updateCartItemQty, removeItemFromCart }) {

    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={line_item.media.source} title={line_item.name} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {line_item.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                    {line_item.price.formatted_with_symbol}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={()=>updateCartItemQty(line_item.id, line_item.quantity - 1)}>-</Button>
                <Typography>{line_item.quantity}</Typography>
                <Button onClick={()=>updateCartItemQty(line_item.id, line_item.quantity + 1)}>+</Button>
                <Button onClick={()=>removeItemFromCart(line_item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem;