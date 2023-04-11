import React from 'react';

export default class Form extends React.Component {
      render(){
        return(
            <div className="form-group">
                <label htmlFor={this.props.htmlFor} className="form-label mt-4">{this.props.label}</label>
                <form className='form-body'>{this.props.children}</form>
            </div>
        )
    }
}