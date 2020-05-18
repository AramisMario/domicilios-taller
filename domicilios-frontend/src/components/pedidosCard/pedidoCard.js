import React,{useState,useEffect} from "react";
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import axios from "axios";

const  PedidosCard = (props) =>{

    const {pedido,setPedidos,pedidos} = props;

    const updatePedidos = () =>{
        setPedidos(pedidos.filter((domicilio)=> domicilio.id !== pedido.id ));
    }

    const handleCancelar = () =>{
        const token = localStorage.getItem('token');
        axios.post('http://127.0.0.1:8000/service/cancelarDomicilio/',{
            "pk":pedido.id
        },{
            headers:{
                "authorization":"Bearer "+token,
                "Content-Type":"application/json"
            }
        })
        .then((response)=>{updatePedidos()})
        .catch(()=>console.log('error'));
    }

    return(
        <React.Fragment>
            <Paper square>
            <Typography variant="h6" component="p">{pedido.empresa}</Typography>
            <Typography variant="h6" component="p">{pedido.producto}</Typography>
            <Typography variant="h6" component="p">{pedido.direccion}</Typography>
            <Typography variant="h6" component="p">{pedido.fecha}</Typography>
            <Typography variant="h6" component="p">{pedido.estado}</Typography>
            <Button 
                variant="contained" 
                color="primary"
                onClick={() => handleCancelar()}
            >
                    Cancelar
            </Button>
        </Paper>
        </React.Fragment>
    );
}

export default PedidosCard;