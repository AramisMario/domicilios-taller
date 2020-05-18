import React from "react";
import { Container,Grid} from '@material-ui/core';
import Tabs from "../tabs/tabs";

const HomeContanier = () =>{

    return(
        <Container fixed>
            <Grid>
                <Grid item sm={12}>
                    {console.log("el token: ",localStorage.getItem('token'))}
                    <Tabs/>
                </Grid>
            </Grid>
        </Container>
    );

}

export default HomeContanier;