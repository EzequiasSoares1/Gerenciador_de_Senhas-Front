import React from 'react';
import'./EditUser.css';
import icon from '../img/Vector.svg';
import Header from '../../components/Header';
import Form from '../../components/Form';
import Button from '../../components/Button';
import Footer from'../../components/Footer';
import UserApiService  from '../../services/UserApiService'
import { showErrorMessage, showSuccessMessage} from '../../components/Toastr';
import AuthenticationApiService from '../../services/AuthenticationApiService';

export default class EditUser extends React.Component {

  state = {
    username: "",
    password: "minhaSenha",
    telephone: ""
  }
  constructor(){
    super();
    this.service = new UserApiService(); 
    this.autentication = new AuthenticationApiService();
  }
  componentWillMount(){
    this.seach()
  }

  setData = (name, telephone) =>{
    this.setState({username: name, telephone:telephone});
  }
  
  verify = () =>{
    const erro = [];

    if(!this.state.username){
      erro.push("Campo nome é obrigatorio");
    }if(!this.state.password){
      erro.push("Campo password é obrigatorio");
    }
   
    return erro;
  }

  seach = async() =>{

    if(this.state.username === ""){
      const user = JSON.parse(localStorage.getItem("loggedUser"));

      this.service.findNoData(user.login)
      .then(response =>
      {
        const userdt = response.data;
        this.setData(userdt.name, userdt.telephone)
      })
      .catch(erro =>
      {
        showErrorMessage("Usuario não encontrado")
      }
      );
    }
  }

  update = async() =>{
    const erro = this.verify();
    if(erro.length > 0){
      erro.forEach((message) =>{
        showErrorMessage(message);
      });
      return false;
    } 
    const login = JSON.parse(localStorage.getItem("loggedUser"));

    let user = {
          name: this.state.username,
          login: login.login,
          telephone: this.state.telephone,
          password: this.state.password,
          dataService:[]
      }
   
    this.service.update(login.login, user)
    .then(response =>{
      
      showSuccessMessage("Dados atualizados");

      setTimeout(function(){
        window.open("http://localhost:3000/home", '_self') 
      }, 1000); 

    })
    .catch(erro =>
    {        
      showErrorMessage(erro)
    });
    
  }

  delete = async () =>{
   
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    this.service.delete(user.login)
    .then(response =>{
      showSuccessMessage("Dados deletados, Adeus ;(")
      this.autentication.logout();
      setTimeout(function(){
        window.open("http://localhost:3000/", '_self') 
      }, 1500)

    }).catch(erro =>
      {        
      showErrorMessage(erro.response)
    });
  }
  render(){
    
    return(
      <Header title="Edit Account" p="insert new data">
      <Form label='Username' htmlFor="InputName">
        <input type="text" className="form-control"  placeholder='Enter you name' 
        defaultValue={this.state.username} onChange={(v) =>{this.setState({username: v.target.value })}}/>
        <small id="help" className="form-text text-muted">Remember that This username will be used to login!!!</small>
      </Form>

      <Form label='Password' htmlFor="InputPassword">
        <input type="password" className="form-control" placeholder=" Enter you password"
        defaultValue={this.state.password} onChange={(v) =>{this.setState({password: v.target.value })}}/>
      </Form> 

      <Form label='Telephone' htmlFor="InputTelephone"> 
        <input type="tel" id="telefone" className="form-control"  required placeholder="(xx) xxxxx-xxxx"
          defaultValue={this.state.telephone} onChange={(v) =>{this.setState({telephone: v.target.value })}}/>
      </Form>
      <Button id="bt" nameClass="btn btn-success" nameButton="Alter" icon={icon} click={this.update}/>
      <Button id="bt" nameClass="btn btn-danger" nameButton="Delet" click={this.delete}/>
      <Footer msg = ""></Footer>
    </Header>
    );
  }
}
