import React from 'react';
import 'bootswatch/dist/darkly/bootstrap.css';
import AppRoutes from './main/AppRoutes';
import 'toastr/build/toastr.css';
import 'toastr/build/toastr.min.js';

export default class App extends React.Component {
  render(){
    return(
      <div>
          <AppRoutes />
        </div>
    )
  }
}


