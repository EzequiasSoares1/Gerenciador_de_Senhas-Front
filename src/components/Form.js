import React from 'react';

export default class Form extends React.Component {
  handleKeyDown = (event) => {
    if (event.keyCode === 13) { // código da tecla Enter
      event.preventDefault(); // impede o envio do formulário
    }
  }
  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.htmlFor} className="form-label mt-4">{this.props.label}</label>
        <form className='form-body' onKeyDown={this.handleKeyDown}>{this.props.children}</form>
      </div>
    )
  }
}
