import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios"
import { useState } from "react";

export default function CadastroProfessor(){

    const [values, setValue] = useState()
    const [data, setData] = useState()

    const pegarValores = value => {
        setValue(prevValue => ({
          ...prevValue,
          [value.target.name]: value.target.value
        }))
    }

    const enviarDados = () => {
        Axios.post("http://localhost:5000/sa/professor", {
            codigo: values.codigo,
            nome: values.nome,
            sobrenome: values.sobrenome
        }).then(response => {
            console.log(response.data)
            console.log(typeof response.data)
            console.log(typeof response.data.erro)
            console.log(typeof response.data.results)   

            let erro = response.data.erro
            let result = response.data.results
            if(erro) alert(erro)
            else alert(result)
        })
    }


    return (<div className="container">
        <h1>Cadastro Professor</h1>
        <nav>
            <Link to="/professor">
                <button className="btn btn-primary btn-sm">Voltar</button>
            </Link>
        </nav>

        <div className="container formulario">
            <div className="form-group">
                <label>Codigo</label>

                <input 
                    type="text"
                    name="codigo"
                    placeholder="codigo" 
                    className="form-control"
                    onChange={pegarValores}/>
                    
            </div>
            <div className="form-group">
                <label>Nome</label>
                <input type="text" name="nome" placeholder="Nome" className="form-control" onChange={pegarValores}/>
            </div>
            <div className="form-group">
                <label>Sobrenome</label>
                <input 
                    type="text"
                    name="sobrenome" 
                    placeholder="Sobrenome" 
                    className="form-control"
                    onChange={pegarValores}/>
            </div>
            <button 
                className="btn btn-primary"
                onClick={enviarDados}
            >Cadastrar</button>
        </div>
    </div>)
}