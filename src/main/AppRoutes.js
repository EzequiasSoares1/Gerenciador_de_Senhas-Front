import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import Login from "../screens/login/LoginUser";
import EditUser from "../screens/EditUser/EditUser";
import CreateUser from '../screens/registreUser/RegistreUser.js';
import Home from "../screens/menu/Menu";
import EditData from '../screens/EditData/EditData';
import CreateData from '../screens/registreData/RegistreData';

function AppRoutes(){
    return(
        <BrowserRouter>
            <Route component= {Login} path="/login"/>
            <Route component= {CreateUser} path="/createUser"/>
            <Route component= {EditUser} path="/editUser"/>
            <Route component= {CreateData} path="/createData"/>
            <Route component= {EditData} path="/editData"/> 
            <Route component= {Home} path="/home"/>
        </BrowserRouter>
    );
}
export default AppRoutes;