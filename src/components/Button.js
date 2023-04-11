import React from 'react';
import './Button.css';
export default class Button extends React.Component {
      render(){
        return(
            <button type="button" onClick= {this.props.click} className={this.props.nameClass}>{this.props.nameButton}<img src= {this.props.icon} alt=''/></button>
        )
    } 
}
