import React, {useState, useEffect} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {useHistory} from "react-router-dom";
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
export default function Registration(){
    let history = useHistory();
    const classes = useStyles();
    const [userInfo, setUserInfo] = useState({});
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(()=>{
      const {email, telefono, nombre, apellido, password} = userInfo;
      if((email && telefono && nombre && apellido && password) !== undefined) setIsDisabled(false);
      if((email && telefono && nombre && apellido && password) === "") setIsDisabled(true);
    },[userInfo]);

    const handleChange = (e) =>{
      setUserInfo({...userInfo,[e.target.id]:e.target.value});
    }

    const signUp = () =>{
      console.log(userInfo);
      axios.post('http://localhost:8000/authregister/signup/',{
            "email":userInfo.email, 
            "telefono":userInfo.telefono,
            "nombre":userInfo.nombre,
            "apellido":userInfo.apellido,
            "password":userInfo.password
      }).then((response)=>{
        console.log(response.data.token);
        localStorage.setItem('token',response.data.token);
        history.push("/home");
      }).catch((error)=>console.log(error));
    }

    return(
      <form  className={classes.form} noValidate autoComplete="off">
          <TextField className={classes.input} 
              id="nombre" 
              label="nombre" 
              variant="outlined"
              onChange={(e)=>handleChange(e)}
          />
          <br/>
          <TextField className={classes.input} 
              id="apellido" 
              label="apellido" 
              variant="outlined"
              onChange={(e)=>handleChange(e)}
          />
          <br/>
          <TextField className={classes.input} 
              id="telefono" 
              label="telefono" 
              variant="outlined"
              onChange={(e)=>handleChange(e)}
          />
          <br/>
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
          {console.log(userInfo)}
          <Button 
          className={classes.button} 
          variant="outlined" 
          color="default"
          disabled={isDisabled}
          onClick={signUp}
          >
            Registrarse   
          </Button>
    </form>
    );
};