import React from 'react';
import './EditData.css';
import Header from '../../components/Header';
import Form from '../../components/Form';
import Button from '../../components/Button';
import axios from 'axios';

export default class EditData extends React.Component {
  state = {
      nameService:"",
      email:"",
      password: "",
      observation: ""
    }
    
  check = () =>{
    return  this.state.password === "";
  }

  setData = (nameService, email, password, observation) =>{
    this.setState({nameService: nameService, email: email, password:password, observation:observation});
  }

  seach = async() =>{

    if(this.check()){
      const id = JSON.parse(localStorage.getItem('@data'));

      await axios.get(`http://localhost:8080/api/data?id=${id}`)
      .then(response =>
      {
        
        const data = response.data;
        console.log(response)
        this.setData(data.nameService,data.email, data.password, data.observation)
      })
      .catch(erro =>
      {
        alert("Dados não encontrados")
      });
    }
    
  }

  update = async() =>{

    if(this.check()){
      alert("Verifique os campos");
    } 
    else{
      const id = JSON.parse(localStorage.getItem('@data'));
      const data = {
        nameService: this.state.nameService,
        email: this.state.email ,
        password: this.state.password,
        observation: this.state.observation
      }
      await axios.put(`http://localhost:8080/api/data/${id}`,data
      )
      .then(response =>{
        alert("Dados cadastrados")
        localStorage.setItem('@data', JSON.stringify(null))
        window.open("http://localhost:3000/home", '_self') 
      })
      .catch(erro =>
      {        
        alert(erro.response)
      });
    }
  }
  render(){
    this.seach()
    return(
        <Header title="Edit Password" p="Atualize as informações">
          <Form label='Service Name' htmlFor="InputText">
              <input type="email" className="form-control"  aria-describedby="textHelp" placeholder="NetFlix"
              defaultValue={this.state.nameService} onChange={(v) =>{this.setState({nameService: v.target.value })}}/>
              </Form>
          <Form label='Email' htmlFor="InputEmail">
            <input type="email" className="form-control"  aria-describedby="emailHelp" placeholder="email@email.com"
            defaultValue={this.state.email} onChange={(v) =>{this.setState({email: v.target.value })}}/>
            </Form>
          <Form label='Password' htmlFor="InputPassword">
              <input type="text" className="form-control"  aria-describedby="passwordHelp" placeholder="**********"
              defaultValue={this.state.password} onChange={(v) =>{this.setState({password: v.target.value })}}/>
              </Form>
          <Form label='Observation' htmlFor="InputObservation">
              <input type="Observation" className="form-control"  aria-describedby="ObservationHelp" placeholder="add note"
              defaultValue={this.state.observation} onChange={(v) =>{this.setState({observation: v.target.value })}}/>
              </Form>
              
          <Button  nameClass="btn btn-info" nameButton="Edit"  click={this.update} />
         
          </Header>
    )
  }
}
