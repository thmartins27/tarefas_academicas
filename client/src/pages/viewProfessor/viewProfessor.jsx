import React from "react";
import { Link } from "react-router-dom";
import "../../App.css"
import Axios from "axios"
import { useState, useEffect } from "react";
import CardProfessor from "../../cards/cardProfessor";

export default function Professor() {

    const [professor, setProfessor] = useState()

    useEffect(() => {
        Axios.get("http://localhost:5000/sa/professores")
            .then(response => {
                setProfessor(response.data.results)
            })
    })

    return (
        <div className="container">
            <h1>Professores</h1>
            <nav className="navbar bg-infor bg-dark navbar-expand-sm bg-light navbar-light">

                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link to="/professor/cadastro">
                            <button className="btn btn-primary btn-sm">Novo</button>
                        </Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/">
                            <button className="btn btn-primary btn-sm">voltar</button>
                        </Link>
                    </li>
                </ul>

            </nav>

            <table id="table-professores" className="table table-hover">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                    </tr>
                </thead>
                <tbody>

                    {typeof professor !== 'undefined' && professor.map(value => {
                        return (
                            <>
                                <CardProfessor
                                    codigo={value.codigo}
                                    nome={value.nome}
                                    sobrenome={value.sobrenome}
                                />
                            </>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}