import React from 'react';
import'./EditUser.css';
import icon from '../img/Vector.svg';
import Header from '../../components/Header';
import Form from '../../components/Form';
import Button from '../../components/Button';
import Footer from'../../components/Footer';
import axios from 'axios';

export default class EditUser extends React.Component {

  state = {
    name: "",
    password: "",
    telephone: ""
  }

  check = () =>{
    return this.state.name === ""  || this.state.password === "";
  }

  setData = (name, password, telephone) =>{
    this.setState({name: name,  password:password, telephone:telephone});
  }

  seach = async() =>{

    if(this.state.name === ""){
      const user = JSON.parse(localStorage.getItem('@user'));

      await axios.get(`http://localhost:8080/api/user/noData?login=${user.login}`)
      .then(response =>
      {
        const userdt = response.data;
        this.setData(userdt.name, userdt.password, userdt.telephone)
      })
      .catch(erro =>
      {
        alert("Usuario não encontrado")
      }
      );
    }
  }

  update = async() =>{

    if(this.check()){
      alert("Verifique os campos");
    } 
    else{
      const login = JSON.parse(localStorage.getItem('@user')).login;
      const user = {
        name: this.state.name,
        login: login,
        password: this.state.password,
        telephone: this.state.telephone
      }
      await axios.put(`http://localhost:8080/api/user/${login}`,user
      )
      .then(response =>{
        localStorage.setItem('@user', JSON.stringify(user))
        alert("Dados cadastrados")
        window.open("http://localhost:3000/home", '_self') 
      })
      .catch(erro =>
      {        
        alert(erro.response)
      });
    }
  }

  delete = async () =>{
    const user = JSON.parse(localStorage.getItem('@user'));
    await axios.delete(`http://localhost:8080/api/user/${user.login}`)
    .then(
      alert("Dados deletados, Adeus ;("),
      window.open("http://localhost:3000/login", '_self')
    ).catch(erro =>{        
      alert(erro.response)
    }
  );
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
