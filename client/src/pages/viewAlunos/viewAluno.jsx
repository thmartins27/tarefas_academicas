import { useState, useEffect } from "react"
import "../../App.css"
import axios from "axios"
import { Link } from "react-router-dom"
import CardAluno from "./cardAluno"


const Aluno = () => {

    const [alunos, setAlunos] = useState()
    //console.log(alunos)

    useEffect(() => {
        axios.get("http://localhost:5000/sa/alunos")
            .then(response => {
                setAlunos(response.data.results)
            })
    })

    return (
        <>
            <div className="container">
                <h1>Alunos</h1>

                <nav className="content-nav">
                    <ul className="nav nav-pills">
                        <li className="nav-item"> 
                            <Link to="/" className="nav-link">
                                <button className="btn btn-primary">Voltar</button>
                            </Link>
                        </li>
                        <li className="nav-item"> 
                            <Link to="/aluno/cadastro" className="nav-link">
                                <button className="btn btn-primary">Novo</button>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <table id="table-alunos" className="table table-hover">
                <thead>
                    <tr>
                        <th>Matricula</th>
                        <th>Nome</th>
                        <th>Turma</th>
                        <th>CPF</th>
                    </tr>
                </thead>
                <tbody>

                    {typeof alunos !== 'undefined' && alunos.map(value => {
                        return (
                            <>
                                <CardAluno
                                    matricula={value.matricula}
                                    nome={value.nome}
                                    turma={value.turma}
                                    cpf={value.CPF}
                                />
                            </>
                        )
                    })}
                </tbody>
            </table>

            </div>
        </>
    )
}

export default Aluno