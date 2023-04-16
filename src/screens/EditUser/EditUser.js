import React from 'react';
import'./EditUser.css';
import icon from '../img/Vector.svg';
import Header from '../../components/Header';
import Form from '../../components/Form';
import Button from '../../components/Button';
import Footer from'../../components/Footer';
import UserApiService  from '../../services/UserApiService'
import { showErrorMessage, showSuccessMessage} from '../../components/Toastr';
export default class EditUser extends React.Component {

  state = {
    name: "",
    password: "",
    telephone: ""
  }
  constructor(){
    super();
    this.service = new UserApiService();
  }
  check = () =>{
    return this.state.name === ""  || this.state.password === "";
  }

  setData = (name, password, telephone) =>{
    this.setState({name: name,  password:password, telephone:telephone});
  }
  
  verify = () =>{
    const erro = [];

    if(!this.state.name){
      erro.push("Campo nome é obrigatorio");
    }
    if(!this.state.password){
      erro.push("Campo password é obrigatorio");
    }
    return erro;
  }

  seach = async() =>{

    if(this.state.name === ""){
      const user = JSON.parse(localStorage.getItem('@user'));

      this.service.findNoData(user.login)
      .then(response =>
      {
        const userdt = response.data;
        this.setData(userdt.name, userdt.password, userdt.telephone)
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
   
    const login = JSON.parse(localStorage.getItem('@user')).login;
    const user = {
      name: this.state.name,
      login: login,
      password: this.state.password,
      telephone: this.state.telephone
    }
    this.service.update(`/${login}`,user)
    .then(response =>{
      localStorage.setItem('@user', JSON.stringify(user))
      showSuccessMessage("Dados atualizados")
      setTimeout(function(){
        window.open("http://localhost:3000/home", '_self') 
      }, 1000); 
    })
    .catch(erro =>
    {        
      showErrorMessage(erro.response)
    });
    
  }

  delete = async () =>{
    const user = JSON.parse(localStorage.getItem('@user'));
    this.service.delete(user.login)
    .then(response =>{
      showSuccessMessage("Dados deletados, Adeus ;(")
      setTimeout(function(){
        window.open("http://localhost:3000/login", '_self') 
      }, 1000)
    }).catch(erro =>{        
      showErrorMessage(erro.response)
    });
  }

  mount = () =>{
      return <Header title="Edit Account" p="insert new data">
        <Form label='Name' htmlFor="InputName">
          <input type="text" className="form-control"  placeholder='Enter you name' 
          defaultValue={this.state.name} onChange={(v) =>{this.setState({name: v.target.value })}}/>
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

  }
    render(){
      return(
         this.seach(),
         this.mount()
        
      )
    }
}
