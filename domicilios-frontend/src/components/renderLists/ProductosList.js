import React, {useState, useEffect} from "react";
import ProductCard from "../productCard/productCard";
import OrderCard from "../orderCard/orderCard";
import axios from "axios";

const ProductosList = () =>{
    const [productos, setProductos] = useState([]);
    const [isOrdering, setIsOrdering] = useState(false);
    const [order, setOrder] = useState({});
    useEffect(()=>{ // se ejecuta antes de montar el componente
        const token = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/service/productos/',{
            headers:{
                "authorization":"Bearer "+token,
                "Content-Type":"application/json"
            }
        })
        .then((response)=>{setProductos(response.data.productos)})
        .catch(()=>console.log("fallo"));
    },[]);

    const handleOrder = (producto) =>{
        setIsOrdering(true);
        setOrder(producto);
    }

    const handleConfirm = () =>{
        const token = localStorage.getItem('token');
        axios.post('http://127.0.0.1:8000/service/domicilios/',{
            productoId:order.id,
            direccion:order.direccion,
        },{
            headers:{
              "authorization":"Bearer "+token,
              "Content-Type":"application/json"
            }})
            .then((response)=>console.log(response.data))
            .catch(()=>console.log("error"));
    }
    return(
        <React.Fragment> 
            {
            (isOrdering === true) 
                ? <OrderCard 
                    order={order} 
                    setIsOrdering={setIsOrdering} 
                    setOrder={setOrder}
                    handleConfirm={handleConfirm}
                    />
                :  productos.map((producto,index) =>{
                    return(
                        <div key={index} style={{marginBottom:'20px',marginTop:'20px'}}>
                            <ProductCard 
                                producto={producto} 
                                handleOrder={handleOrder}
                                />
                        </div>
                    );
                })
            }
    </React.Fragment>
    );
}

export default ProductosList;