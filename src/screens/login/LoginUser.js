import React from 'react';
import './LoginUser.css';
import icon from '../img/Vector.svg';
import Header from '../../components/Header';
import Form from '../../components/Form';
import Button from '../../components/Button';
import Footer from'../../components/Footer';
import { showErrorMessage } from '../../components/Toastr';
import UserApiService  from '../../services/UserApiService';

export default class Login extends React.Component {
  
  state = {
      email:"",
      password: "",
  }

  check = (log,pass) =>{
    return this.state.email === log && this.state.password === pass;
  }
  constructor(){
    super();
    this.service = new UserApiService();
  }
    
  verify = () =>{
    const erro = [];

    if(!this.state.email){
      erro.push("Campo email é obrigatorio");
    } 
    else if(!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
      erro.push("Informe email valido");
    }
    if(!this.state.password){
      erro.push("Campo password é obrigatorio");
    }
    return erro;
  }

  seach = () =>{
    const erro = this.verify();
    if(erro.length > 0){
      erro.forEach((message) =>{
        showErrorMessage(message);
      });
      return false;
    } 
    
   this.service.findNoData(this.state.email)
    .then(response =>
    {
      const user = response.data;
      
      if(this.check(user.login, user.password)){
        localStorage.setItem('@user', JSON.stringify(user));
        window.open("http://localhost:3000/home", '_self')
      }
      else{
        showErrorMessage("Usuario não encontrado")
      }
    }).catch(erro =>{
      showErrorMessage("Usuario não encontrado")
      console.log(erro.response)
    });
    
  }
    render(){
      return(
          <Header title="Login" p="Welcome Back!">
           
            <Form label='Email' htmlFor="InputEmail">
              <input type="email" className="form-control"  aria-describedby="emailHelp" placeholder="email@email.com"
              defaultValue={this.state.email} onChange={(v) =>{this.setState({email: v.target.value })}}/>
              <small id="emailHelp" className="form-text text-muted">Enter your email to get started</small>
              </Form>

            <Form label='Password' htmlFor="InputPassword">
                <input type="password" className="form-control" placeholder=" Enter you password"
                defaultValue={this.state.password} onChange={(v) =>{this.setState({password: v.target.value })}}/>
              </Form>

            <Button  nameClass="btn btn-success" nameButton="Sign in" icon={icon} click= {this.seach}/>
            
            <Footer msg = "Don't have an account yet? ">
              <a href="/createUser">Register</a>
            </Footer>

            </Header>
      )
    }
}
