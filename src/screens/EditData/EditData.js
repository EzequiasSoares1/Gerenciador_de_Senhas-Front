import React from 'react';
import './EditData.css';
import Header from '../../components/Header';
import Form from '../../components/Form';
import Button from '../../components/Button';
import { showErrorMessage, showSuccessMessage} from '../../components/Toastr';
import DataApiService  from '../../services/DataApiService'

export default class EditData extends React.Component {
  state = {
      nameService:"",
      email:"",
      password: "",
      observation: ""
  }
  constructor(){
    super();
    this.service = new DataApiService();
  }
    
  check = () =>{
    return  this.state.password === "";
  }

  verify = () =>{
    const erro = [];

    if(this.state.email){
     if(!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
       erro.push("Informe email valido");
      }
    }
    if(!this.state.password){
      erro.push("Campo password é obrigatorio");
    }
    return erro;
  }

  setData = (nameService, email, password, observation) =>{
    this.setState({nameService: nameService, email: email, password:password, observation:observation});
  }

  seach = async() =>{

    if(this.check()){
      const id = JSON.parse(localStorage.getItem('@data'));

      this.service.find(id)
      .then(response =>
      {
        
        const data = response.data;
        console.log(response)
        this.setData(data.nameService,data.email, data.password, data.observation)
      })
      .catch(erro =>
      {
        showErrorMessage("Dados não encontrados")
      });
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
    
    const id = JSON.parse(localStorage.getItem('@data'));
    const data = {
      nameService: this.state.nameService,
      email: this.state.email ,
      password: this.state.password,
      observation: this.state.observation
    }
    this.service.update(`/${id}`,data)
    .then(response =>{
      localStorage.setItem('@data', JSON.stringify(null))
      showSuccessMessage("Dados cadastrado com sucesso")
      setTimeout(function(){
        window.open("http://localhost:3000/home", '_self')
      }, 1500)
    })
    .catch(erro =>
    {        
      showErrorMessage(erro.response)
    });
    
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
    );
  }
}
