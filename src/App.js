import React from 'react';
import 'bootswatch/dist/darkly/bootstrap.css';
import AppRoutes from './main/AppRoutes';
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';
import SessionProvider from '../src/main/SessionProvider';

export default class App extends React.Component {
  render(){
    return(
      <SessionProvider>
        <AppRoutes/>
      </SessionProvider>
    )
  }
}


