import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles((theme)=>{
    return({
        form:{
            paddingTop: '50px',
            width: '75%',
            minWidth:'25ch',
            margin:'auto',
            textAlign:'center'
          },
          input:{
              marginBottom:'15px',
              width:'75%',
              minWidth:'25ch',
          },
          button:{
            width: '75%',
            minWidth:'25ch',
            marginBottom:'15px',
          },
          textArea:{
            width:'75%',
            minWidth:'25ch',
            marginBottom:'15px',
          },
    });
});
export default function Login(props){
    const {setPage} = props;
    const classes = useStyles();
    const [credentials, setCredentials] = useState({});
    let history = useHistory();

    const handleChange = (e) =>{
      setCredentials({...credentials,[e.target.id]:e.target.value});
    }

    const handleLogin = () =>{
      axios.post('http://localhost:8000/authregister/signin/',{
          "email":credentials.email,
          "password":credentials.password
      }).then((response)=>{
        console.log(response);
        if(response.data.token){
          localStorage.setItem('token',response.data.token);
          history.push("/home");      
        }else if(response.data.message){
          console.log("datos incorrectos");
        }
      }).catch((error)=>console.log(error));
    }

    return(
      <form className={classes.form} noValidate autoComplete="off">
          <TextField className={classes.input} 
              id="email" 
              label="email" 
              variant="outlined"
              onChange={(e)=>handleChange(e)}
          />
          <br/>
          <TextField className={classes.input} 
              id="password" 
              type="password" 
              label="password" 
              variant="outlined" 
              onChange={(e)=>handleChange(e)}
              />
          <br/>
          <Button 
            id="loginButton"
            className={classes.button} 
            variant="outlined" 
            color="primary"
            onClick={handleLogin}
            >
              Iniciar sesion   
            </Button>
            <Button 
            id="registrationButton"
            className={classes.button} 
            variant="outlined" 
            color="default"
            onClick={()=> setPage({page:"regist"})}
            >
            Registrarse   
          </Button>
    </form>
  );
};