import React from "react";
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
const ProductCard = (props) =>{
    const {producto,handleOrder} = props;
    return(
        <Paper square>
            <Typography variant="h6" component="p">{producto.nombre}</Typography>
            <Typography variant="h6" component="p">{producto.empresas.nombre}</Typography>
            <Typography variant="h6" component="p">precio: {producto.precio}</Typography>
            <Button 
                variant="contained" 
                color="primary"
                onClick={()=>handleOrder(producto)}
                >
                    Ordenar
            </Button>
            {/* <Button variant="contained" color="secondary">
                    Agregar al carrito
            </Button> */}
        </Paper>  
    );
}

export default ProductCard;