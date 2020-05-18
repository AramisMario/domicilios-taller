import React,{useState,useEffect} from "react";
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
const OrderCard = (props) =>{
    
    const {order,setOrder, handleConfirm, setIsOrdering} = props;

    useEffect(()=>{
        return(()=>{
            setIsOrdering(false);
        });
    },[])

    return(
        <React.Fragment>
            <Paper square>
            <Typography variant="h6" component="p">{order.nombre}</Typography>
            <Typography variant="h6" component="p">precio: {order.precio}</Typography>
            <TextField 
              id="direccion" 
              type="adress" 
              label="direccion" 
              variant="outlined"
              onChange={(e)=>setOrder({...order,direccion:e.target.value})}
              />
            <Button 
                variant="contained" 
                color="primary"
                onClick={handleConfirm}
            >
                    confirmar
            </Button>
        </Paper>
        </React.Fragment>
    );
}

export default OrderCard;