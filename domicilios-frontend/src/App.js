import React from 'react';
import HomeContainer from "./components/PContainers/homeContainer";
import LoginContainer from "./components/PContainers/loginContainer";
import {BrowserRouter, Route, Switch} from "react-router-dom";
function App(){
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={HomeContainer}/>
        <Route excat path="/login" component={LoginContainer}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
