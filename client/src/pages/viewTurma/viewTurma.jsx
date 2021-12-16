import { Link } from "react-router-dom"
import axios from "axios"
import CardTurma from "./CardTurma"
import { useState, useEffect } from "react"

const Turma = () => {

    const [turma, setTurma] = useState()
    console.log(turma)
    useEffect(() => {
        axios.get("http://localhost:5000/sa/turmas")
            .then(res => {
                setTurma(res.data.results)
            })
    })

    return (<>
        <div className="container">

            <h1>Turma</h1>
            <nav className="content-nav">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            <button className="btn btn-primary">Voltar</button>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/turma/cadastro" className="nav-link">
                            <button className="btn btn-primary">Novo</button>
                        </Link>
                    </li>
                </ul>
            </nav>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Turma</th>
                        <th>Curso</th>
                        <th>Periodo</th>
                        <th>Inicio</th>
                    </tr>
                </thead>
                <tbody>
                    {typeof turma !== 'undefined' && turma.map(value => {

                        let periodo
                        switch (value.periodo) {
                            case 'N':
                                periodo = 'Noturno'
                                break
                            case 'D':
                                periodo = 'Diurno'
                                break
                            case 'V':
                                periodo = 'Vespertino'
                                break
                        }

                        return (<>
                            <CardTurma 
                                turma={value.turma}
                                curso={value.curso}
                                periodo={periodo}
                                data={value.data}                                
                            />
                        </>)
                    })}
                </tbody>
            </table>

        </div>
    </>)
}

export default Turma