import React from 'react';
import { showSuccessMessage } from './Toastr';

 
const salve = (e) =>{
    localStorage.setItem('@data', JSON.stringify(e))
    showSuccessMessage("Linha selecionada")
} 

export default props => { 
   
    const rows = props.datas.map( data =>{
        return(
            <tr  key={data.id} onClick={() => salve(data.id)}>
                <td>{data.nameService}</td>
                <td>{data.email}</td>
                <td>{data.password}</td>
                <td>{data.observation}</td>
            </tr>
        )
    });

    return (
        <table  className="table table-hover">
            <thead>
                <tr className="table-active">
                    <th scope="col">Service</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Password</th>
                    <th scope="col">Observation</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}