import React,{useState, useEffect} from "react";
import PedidoCard from "../pedidosCard/pedidoCard.js"; 
import axios from "axios";

const PedidosList = (props) =>{
    const [pedidos, setPedidos] = useState([]);

    useEffect(()=>{
        const token = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/service/pedidos/',{
            headers:{
                "authorization":"Bearer "+token,
                "Content-Type":"application/json"
            }
        }).then((response)=>{setPedidos(response.data.pedidos);console.log(response.data)}).catch(()=>console.log('error'));
    },[]);

    return(
        <React.Fragment>
            {pedidos.map((pedido, index)=>{
                return(
                    <PedidoCard key={index} 
                    pedido={pedido} 
                    setPedidos={setPedidos} 
                    pedidos={pedidos}/>
                );
            })}
        </React.Fragment>
    );

} 

export default PedidosList;