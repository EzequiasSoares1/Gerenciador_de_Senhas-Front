import React from 'react';
import'./RegistreUser.css';
import icon from '../img/Vector.svg';
import Header from '../../components/Header';
import Form from '../../components/Form';
import Button from '../../components/Button';
import Footer from'../../components/Footer';
import { showErrorMessage, showSuccessMessage } from '../../components/Toastr';
import UserApiService  from '../../services/UserApiService';

export default class RegistreUser extends React.Component {
  state = {
    username: "",
    login:"",
    password: "",
    telephone: ""
  }
  constructor(){
    super();
    this.service = new UserApiService();
    
  }
  verify = () =>{
    const erro = [];

    if(!this.state.username){
      erro.push("Campo nome é obrigatorio");
    }
    if(!this.state.login){
      erro.push("Campo email é obrigatorio");
    } else if(!this.state.login.match(/^\S+@\S+\.\S+$/)){
      erro.push("Informe email valido");
    }
    if(!this.state.password){
      erro.push("Campo senha é obrigatorio");
    }
    return erro;
  }
  create = async () =>{
    const erro = this.verify();
    if(erro.length > 0){
      erro.forEach((message) =>{
        showErrorMessage(message);
      });
      return false;
    }
    
    const  user = 
     { 
      name: this.state.username,
      login: this.state.login,
      password: this.state.password,
      telephone: this.state.telephone
    }
    this.service.create(user)
    .then(response =>
        {
          showSuccessMessage("Dados cadastrado com sucesso")
          setTimeout(function(){
            window.open("http://localhost:3000/home", '_self')
          }, 1500)
        })
      .catch(erro =>
        {
          if(erro.response.data === 'USER ALREADY EXISTS'){
            showErrorMessage("Usuario já existe")
          }else{
            showErrorMessage("Verifique seus dados")
         }
      }
          
      );
  }
    render(){
      return(
          <Header title="Create Account" p="Welcome, insert your data">

            <Form label='Username' htmlFor="InputName">
              <input type="text" className="form-control"  placeholder='Enter you username' 
              defaultValue={this.state.username} onChange={(v) =>{this.setState({username: v.target.value })}}/>
              <small id="emailHelp" className="form-text text-muted">This name will be used to login</small>

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
              <a href="/">Sign in</a>
              </Footer>
          </Header>
      )
    }
}
