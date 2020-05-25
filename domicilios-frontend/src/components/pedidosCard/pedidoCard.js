import React,{useState,useEffect} from "react";
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import axios from "axios";

const  PedidosCard = (props) =>{

    const {pedido,setPedidos,pedidos} = props;
    const [pagado, setPagado] = useState(pedido.pagado);
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

    const handlePagar = () =>{
        const token = localStorage.getItem('token');
        axios.put('http://127.0.0.1:8000/service/pagarDomicilio/',{
            "empresaId":pedido.empresaId,
            "precioProducto":pedido.precioProducto,
            "id":pedido.id
        },{
            headers:{
                "authorization":"Bearer "+token,
                "Content-Type":"application/json"
            }
        }).then((response)=>setPagado(1)).catch(()=>console.log("error"));
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
                id="cancelar" 
                variant="contained" 
                color="primary"
                onClick={() => handleCancelar()}
            >
                    Cancelar
            </Button>
            <Button 
                id="pagarButton"
                variant="contained" 
                color="secondary"
                disabled={pagado === 1  && true}
                onClick={() => handlePagar()}
            >
                    {pagado === 0 ? "pagar" : "pagado"}
            </Button>
        </Paper>
        </React.Fragment>
    );
}

export default PedidosCard;