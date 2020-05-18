import React,{useState, useEffect} from "react";
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import axios from "axios";

const EmpresasList = () =>{

    const [empresas,setEmpresas] = useState([]);
    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/service/empresas/',{
            headers:{
                "authorization":"Bearer "+token,
                "Content-Type":"application/json"
            }
        })
        .then((response)=>setEmpresas(response.data.empresas))
        .catch(()=>console.log("fallo"));
    },[]);

    return (
        <React.Fragment>
            {empresas.map((empresa,index) =>{
                return(
                    <div key={index}>
                        <Paper square>
                            <h2>{empresa.nombre}</h2>
                            <Button variant="contained" color="primary">
                                Ver menu
                            </Button>
                        </Paper>   
                    </div>
                );
            })}
        </React.Fragment>
    );
}

export default EmpresasList;