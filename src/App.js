import React from 'react';
import 'bootswatch/dist/darkly/bootstrap.css';
import AppRoutes from './main/AppRoutes';

export default class App extends React.Component {
  render(){
    return(
      <div>
          <AppRoutes />
        </div>
    )
  }
}


