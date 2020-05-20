import React,{useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Empresas from "../renderLists/empresasList";
import Productos from "../renderLists/ProductosList";
import Pedidos from "../renderLists/pedidosList";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme)=>({
    results: {
      maxHeight:'520px',
      overflowY:'auto'
    }
  
  }));
export default function DisabledTabs() {
  const classes = useStyles();
  const [tabIndex, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <React.Fragment>
    <Paper square>
      <Tabs
        value={tabIndex}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Empresas" />
        <Tab label="Productos" />
        <Tab label="Pedidos" />
      </Tabs>
    </Paper>
    <div className={classes.results}>
      {tabIndex === 0 && <Empresas/>}
      {tabIndex === 1 && <Productos/>}
      {tabIndex === 2 && <Pedidos/>}
    </div>
    

    </React.Fragment>
  );
}