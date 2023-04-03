import React from 'react';
import './App.css';

export default class App extends React.Component {
  state = {
    name: "",
    email:"",
    password: ""
  }
  check = () =>{
    let ok =  this.state.name === "" || this.state.email === "" || this.state.password === "";
    return ok?"Verifique os Campos":"Dados cadastrados";
  }
  salve = () =>{
    alert(this.check());
    
  }
  render(){
    return(
      <div className="App">
        <header className="App-header">
        <h1>Formulário de cadastrados</h1>.
        
        <label className="label">Nome</label>
        <input className="inputs" type='text' 
          defaultValue={this.state.name}
          onChange={(v) =>{this.setState({name: v.target.value })}}/>
        <br/>
        
        <label className="label">E-mail</label>
        <input className="inputs" type='email'  
          defaultValue={this.state.email} 
          onChange={(v) =>{this.setState({email: v.target.value })}}/>
        <br/>

        <label  className="label">Senha</label>
        <input className="inputs" type='password' 
         defaultValue={this.state.password}  
         onChange={(v) =>{this.setState({password: v.target.value })}}/>
        <br/>

        <button onClick={this.salve}>Salvar</button>
        </header>
      </div> 
    )
  }
}


