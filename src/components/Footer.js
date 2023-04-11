import React from 'react';
import './Footer.css';
export default class Footer extends React.Component {
      render(){
        return(
            <div className="footer">
               <p>{this.props.msg}</p>
                {this.props.children}
             </div>
        )
    }
}