import React from 'react';
import './LoginUser.css';
import icon from '../img/Vector.svg';
import Header from '../../components/Header';
import Form from '../../components/Form';
import Button from '../../components/Button';
import Footer from'../../components/Footer';
import { showErrorMessage, showSuccessMessage } from '../../components/Toastr';
import { AuthContext } from '../../main/SessionProvider';

  class Login extends React.Component {
  
  state = {
      username:"",
      password: ""
  }  

  verify = () =>{
    const erro = [];

    if(!this.state.username){
      erro.push("Campo Username é obrigatorio");
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

    this.context.login(
      this.state.username,
      this.state.password
    ).then(response =>
    {
      showSuccessMessage(`${response.name}, você está logado!`);
      setTimeout(function(){
        window.open("http://localhost:3000/home", '_self')
      }, 1500)

    }).catch(erro =>{
      showErrorMessage("Usuario não encontrado")
      console.log(erro.response)
    });
    
  }
    render(){

      return(
          <Header title="Login" p="Welcome Back!">
           
            <Form label='UserName' htmlFor="InputUserName">
              <input type="text" className="form-control" placeholder="UserName@74"
              defaultValue={this.state.username} onChange={(v) =>{this.setState({username: v.target.value })}}/>
              <small id="help" className="form-text text-muted">Enter registered username</small>
              </Form>

            <Form label='Password' htmlFor="InputPassword">
                <input type="password" className="form-control" placeholder=" Enter you password"
                defaultValue={this.state.password} onChange={(v) =>{this.setState({password: v.target.value })}}/>
              </Form>

            <Button  nameClass="btn btn-success" nameButton="Sign in" icon={icon} click= {this.seach} />
            
            <Footer msg = "Don't have an account yet? ">
              <a href="/createUser">Register</a>
            </Footer>

            </Header>
      )
    }
}
Login.contextType = AuthContext;
export default Login;