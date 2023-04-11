import React from 'react';
import DataTable from '../../components/dataTable';
import axios from 'axios';
import "./Menu.css";

export default class Main extends React.Component {
  state = {
    data: []
  }

  getData = async() =>{
    localStorage.setItem('@data', JSON.stringify(null))
    if(this.state.data.length === 0){
      const login = JSON.parse(localStorage.getItem('@user')).login;
      await axios.get(`http://localhost:8080/api/user?login=${login}`)
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
  }
  
  checkerIsId = () =>{
    const id = JSON.parse(localStorage.getItem('@data'));
    return id === null;
  }
  windowEdit= () =>{
    if(this.checkerIsId()){
      alert("Selecione uma linha da tabela")
    }else{
      window.open("http://localhost:3000/editData", '_self')
    }
  }
  deleteData = () =>{
    const id = JSON.parse(localStorage.getItem('@data'));
    if(this.checkerIsId()){
      alert("Selecione uma linha da tabela")
    }else{
      axios.delete(`http://localhost:8080/api/data/${id}`)
      .then(response => {
        alert("Senha excluida")
        window.location.reload()
      }
      ).catch(error => {
          console.log(error.response);
      }
      );
    }
  }
  
  render(){
    this.getData();
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
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <body className="body-table">
        <div className="text-delet">
            <p>Click na linha a qual deseja alterar ou excluir</p>
          </div>
        <DataTable className="table" datas={this.state.data}/>
          
      </body>
      
      </>
    )
  }
}
