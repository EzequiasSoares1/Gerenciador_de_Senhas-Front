import React from 'react';
import './RegistreData.css';
import Header from '../../components/Header';
import Form from '../../components/Form';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import axios from 'axios';

export default class EditData extends React.Component {
    state = {
        serviceName:"",
        email:"",
        password: "",
        observation: ""
      }
       
  create = async () =>{
    const user = JSON.parse(localStorage.getItem('@user'));
    var data =  { 
      name:user.name ,
      login: user.login,
      password: user.password,
      telephone:  user.telephone,
      dataService:[{
        id:0,
        nameService: this.state.serviceName,
        password: this.state.password,
        email:  this.state.email,
        observation:  this.state.observation
      }]
    }    
    
    axios.put(`http://localhost:8080/api/user/${user.login}`, data)
    .then(

      alert("Dados cadastrados"),
      window.open("http://localhost:3000/home", '_self') 

    ).catch(erro =>{
        alert("Dados não cadastrados")
    });
  }
    
    render(){
      return(
          <Header title="New Password" p="Insira as informações">
            <Form label='Service Name' htmlFor="InputText">
                <input type="email" className="form-control"  aria-describedby="textHelp" placeholder="NetFlix"
                defaultValue={this.state.serviceName} onChange={(v) =>{this.setState({serviceName: v.target.value })}}/>
                </Form>
            <Form label='Email' htmlFor="InputEmail">
              <input type="email" className="form-control"  aria-describedby="emailHelp" placeholder="email@email.com"
              defaultValue={this.state.email} onChange={(v) =>{this.setState({email: v.target.value })}}/>
              </Form>
            <Form label='Password' htmlFor="InputPassword">
                <input type="text" className="form-control"  aria-describedby="passwordHelp" placeholder="1234156"
                defaultValue={this.state.password} onChange={(v) =>{this.setState({password: v.target.value })}}/>
                </Form>
            <Form label='Observation' htmlFor="InputObservation">
                <input type="Observation" className="form-control"  aria-describedby="ObservationHelp" placeholder="add note"
                defaultValue={this.state.observation} onChange={(v) =>{this.setState({observation: v.target.value })}}/>
                </Form>
                
            <Footer msg="Don't worry, your data is safely saved."></Footer>
            <Button  nameClass="btn btn-info" nameButton="Save" click={this.create}/>
            </Header>
      )
    }
}
