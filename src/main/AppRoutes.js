import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { AuthConsumer } from './SessionProvider';
import Login from "../screens/login/LoginUser";
import EditUser from "../screens/EditUser/EditUser";
import CreateUser from '../screens/createUser/RegistreUser.js';
import Home from "../screens/home/Menu";
import EditData from '../screens/EditData/EditData';
import CreateData from '../screens/createData/RegistreData';

function RestrictedRoute({ component: Component, show, ...props }) {
    return (
        <Route exact {...props} render={(componentProps) => {
            if (show) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                return (
                    <Redirect to={{ pathname: '/', state: { from: componentProps.location } }} />
                )
            }
        }} />
    )
}

function AppRoutes(props){
    return(
        <BrowserRouter>
            <Switch>
                <Route component= {Login} path="/" exact/>
                <Route component= {CreateUser} path="/createUser"/>

                <RestrictedRoute show={props.isAuthenticated} component= {EditUser} path="/editUser"/>
                <RestrictedRoute show={props.isAuthenticated}  component= {CreateData} path="/createData"/>
                <RestrictedRoute show={props.isAuthenticated} component= {EditData} path="/editData"/> 
                <RestrictedRoute show={props.isAuthenticated}  component= {Home} path="/home"/>
            </Switch>
        </BrowserRouter>
        
    );
}
export default () => (
    <AuthConsumer>
        { (context) => (<AppRoutes isAuthenticated={context.isAuthenticated} />) }
    </AuthConsumer>
)


