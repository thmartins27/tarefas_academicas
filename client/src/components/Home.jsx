import { useState } from "react"
import { Link } from "react-router-dom"
import "../components/Home.css"

const Home = () => {
    return (
        <>
            <div className="container">
                <h2 className="title-page">Tarefas academicas</h2>

                <nav className="container content-nav">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link className="nav-link title-link" to="/professor">Professor</Link>
                        </li>
                        <li className="">
                            <Link className="nav-link title-link" to="/alunos">Aluno</Link>
                        </li>
                        <li className="">
                            <Link className="nav-link title-link" to="/turma">Turma</Link>
                        </li>
                        <li className="">
                            <Link className="nav-link title-link" to="/professor">Prova</Link>
                        </li>
                        <li className="">
                            <Link className="nav-link title-link" to="/professor">Eventos</Link>
                        </li>
                    </ul>
                </nav>

            </div>
        </>
    )
}

export default Home