import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";

export function camposValue(){
    
}

export default function AlterProfessor() {

    const [values, setValues] = useState()
    console.log(values)
    const pegarValores = (values) => {
        setValues(prevValue => ({
            ...prevValue,
            [values.target.name]: values.target.value
        }))
    }

    return (<>
        <div className="container">
            <h1>Alter Professor</h1>

            <div className="form-group">
                <label>Codigo</label>
                <input
                    type="text"
                    name="codigo"
                    placeholder="codigo"
                    className="form-control"
                    onChange={pegarValores} />
            </div>
            <div className="form-group">
                <label>Nome</label>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    className="form-control"
                    onChange={pegarValores} />
            </div>
            <div className="form-group">
                <label>Sobrenome</label>
                <input
                    type="text"
                    name="sobrenome"
                    placeholder="Sobrenome"
                    className="form-control"
                    onChange={pegarValores} />
            </div>

            <div className="btn">
                <Link to="/professor">
                    <button className="btn btn-outline-primary">Voltar</button>
                </Link>
                <button className="btn btn-outline-primary">Salvar</button>

            </div>

        </div>
    </>)
}