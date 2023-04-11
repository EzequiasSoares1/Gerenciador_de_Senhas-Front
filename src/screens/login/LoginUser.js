import React from 'react';
import './LoginUser.css';
import icon from '../img/Vector.svg';
import Header from '../../components/Header';
import Form from '../../components/Form';
import Button from '../../components/Button';
import Footer from'../../components/Footer';
import axios from 'axios';

export default class Login extends React.Component {
  
    state = {
        email:"",
        password: "",
    }

    check = (log,pass) =>{
      return this.state.email === log && this.state.password === pass;
    }

    seach = async () =>{
      
      axios.get(`http://localhost:8080/api/user?login=${this.state.email}`)
        .then(response =>
        {
        const user = response.data;
        
        if(this.check(user.login, user.password)){
          localStorage.setItem('@user', JSON.stringify(user))
          window.open("http://localhost:3000/home", '_self')   
        }
        else{
          alert("Usuario não encontrado")
        }
        }
        ).catch(erro =>{
          alert("Usuario não encontrado")
        }
        );
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
