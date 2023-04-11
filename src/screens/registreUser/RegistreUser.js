import React from 'react';
import'./RegistreUser.css';
import icon from '../img/Vector.svg';
import Header from '../../components/Header';
import Form from '../../components/Form';
import Button from '../../components/Button';
import Footer from'../../components/Footer';
import axios from 'axios';

export default class RegistreUser extends React.Component {
  state = {
    name: "",
    login:"",
    password: "",
    telephone: ""
  }
  
  create = async () =>{
    const  user =  { 
      name: this.state.name,
      login: this.state.login,
      password: this.state.password,
      telephone: this.state.telephone,
    };
    
   await axios.post('http://localhost:8080/api/user',user)
   .then(response =>
      {
        localStorage.setItem('@user', JSON.stringify(user))
        alert("Dados cadastrado com sucesso")
        window.open("http://localhost:3000/home", '_self')
      })
    .catch(erro =>
      {
        alert("Verifique seus dados")
      }
    );
  }
    render(){
      return(
          <Header title="Create Account" p="Welcome, insert your data">

            <Form label='Name' htmlFor="InputName">
              <input type="text" className="form-control"  placeholder='Enter you name' 
              defaultValue={this.state.name} onChange={(v) =>{this.setState({name: v.target.value })}}/>
            </Form>

            <Form label='Email' htmlFor="InputEmail">
              <input type="email" className="form-control"  placeholder="email@email.com"
              defaultValue={this.state.login} onChange={(v) =>{this.setState({login: v.target.value })}}/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </Form>

            <Form label='Password' htmlFor="InputPassword">
              <input type="password" className="form-control" placeholder=" Enter you password"
              defaultValue={this.state.password} onChange={(v) =>{this.setState({password: v.target.value })}}/>
            </Form> 

            <Form label='Telephone' htmlFor="InputTelephone"> 
              <input type="tel" id="telefone" className="form-control"  required placeholder="(xx) xxxxx-xxxx"
                defaultValue={this.state.telephone} onChange={(v) =>{this.setState({telephone: v.target.value })}}/>
            </Form>

            <Button  nameClass="btn btn-danger" nameButton="Sign up" icon={icon} click={this.create}/>

            <Footer msg = "Already have an account: ">
              <a href="/login">Sign in</a>
              </Footer>
          </Header>
      )
    }
}
