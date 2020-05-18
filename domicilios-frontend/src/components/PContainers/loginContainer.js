import React,{useState} from "react";
import Login from "../login/login";
import Registration from "../login/registration";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Box } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme)=>({
    root: {
      minHeight:'70vh',
      minWidth:'40vh',
      margin:'auto'
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  
  }));
  
  export default function LoginContainer() {
    const classes = useStyles();
    const [page,setPage] = useState({page:"login"});
  
    return (
      <Card className={classes.root}>
        <CardContent>
          <Box>
              {page.page == "login" && <Login setPage={setPage}/>}
              {page.page == "regist" && <Registration setPage={setPage}/>}
          </Box>
        </CardContent>
        <CardActions>
        </CardActions>
      </Card>
    );
  }