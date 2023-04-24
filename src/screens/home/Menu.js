import React from 'react';
import DataTable from '../../components/dataTable';
import "./Menu.css";
import { showErrorMessage, showSuccessMessage } from '../../components/Toastr';
import DataApiService  from '../../services/DataApiService';
import UserApiService  from '../../services/UserApiService';
import AuthenticationApiService from '../../services/AuthenticationApiService';

export default class Main extends React.Component {
  state = {
    data: []
  }

  constructor(){
    super();
    this.serviceUser = new UserApiService();
    this.serviceData = new DataApiService();
    this.autentication = new AuthenticationApiService();
  }

  componentDidMount(){
    this.getData();
  }
  logout(){
    this.autentication.logout();
    window.open("http://localhost:3000/login", '_self')
  }

  getData = async() =>{
      localStorage.setItem("@data", null);
      const login = JSON.parse(localStorage.getItem("loggedUser")).login;
      this.serviceUser.find(login)
      .then(response =>
      {
        const data = response.data.dataService;
        this.setState({ data })
      })
      .catch(erro =>
      {
        console.log(erro.response)
      }); 
    
  }
  
  checkerIsId = () =>{
    const id = JSON.parse(localStorage.getItem("@data"));
    return id === null;
  }
  

  windowEdit= () =>{
    if(this.checkerIsId()){
      showErrorMessage("Selecione uma linha da tabela")
    }else{
      window.open("http://localhost:3000/editData", '_self')
    }
  }

  deleteData = () =>{
    if(this.checkerIsId()){
      showErrorMessage("Selecione uma linha da tabela")
    }else{

      const id = JSON.parse(localStorage.getItem("@data")); 
      this.serviceData.delete(id)
      .then(response => {
        showSuccessMessage("Senha excluida");
        setTimeout(function(){
          window.location.reload()
        }, 1000);
      })
      .catch(error => {
          console.log(error.response);
      });
    }
  }
  
  render(){
    return(
      <><div className="navbar_menu">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <a className="navbar-brand" href='/'>My Passwords</a>
            <div className="collapse navbar-collapse" id="navbarColor01">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link" href='/editUser'>Profile</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href='/createData'>New Password</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link"  onClick={() => this.windowEdit()}>Edit Password</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link"   onClick={() => this.deleteData()}>Delete Password</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link"  onClick={() => this.logout()}href='/'>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="text-delet">
          <p>Click na linha a qual deseja alterar ou excluir</p>
        </div>
      <DataTable className="table" datas={this.state.data}/>        
      </>
    )
  }
}

