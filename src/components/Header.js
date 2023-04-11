import React from 'react';
import '../screens/global/global.css';
export default class Header extends React.Component {
   
      render(){
        return(
            <div className="container">
                <header className='header-md-1'>
                    <h3 className='header-title'>{this.props.title}</h3>
                    <p className='header-p'>{this.props.p}</p>
                    <hr className='header-hr'></hr>
                </header>
                <div>
                 {this.props.children}
                </div>
              </div>
        )
    }
}