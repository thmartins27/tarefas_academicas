import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

const CadastroAluno = () => {

    const [values, setValue] = useState()

    const pegarValores = value => {
        setValue(prevValues => ({
            ...prevValues,
            [value.target.name]: value.target.value
        }))
    }

    const envirValores = () => {
        axios.post('http://localhost:5000/sa/aluno', {
            matricula: values.matricula,
            nome: values.nome,
            sobrenome: values.sobrenome,
            turma: values.turma,
            cpf: values.cpf
        }).then(res => {
            let erro = res.data.erro
            let results = res.data.results
            if(erro) alert(erro)
            else alert(results)
        })
    }

    return <>
        <div className="container">
            <h1>Aluno</h1>
            <nav className="content-nav">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link className="nav-link" to="/alunos">
                            <button className="btn btn-primary">Voltar</button>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a hrf="#" className="nav-link">
                            <button onClick={envirValores} className="btn btn-primary">Salvar</button>
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="container">
                <form action="">
                    <div className="form-group">
                        <label>Matricula</label>
                        <input type="text" className="form-control" placeholder="Matricula" name="matricula" onChange={pegarValores}/>
                    </div>
                    <div className="form-group">
                        <label>Nome</label>
                        <input type="text" className="form-control" placeholder="Nome" name="nome" onChange={pegarValores}/>
                    </div>
                    <div className="form-group">
                        <label>sobrenome</label>
                        <input type="text" className="form-control" placeholder="Sobrenome" name="sobrenome" onChange={pegarValores}/>
                    </div>
                    <div className="form-group">
                        <label>Turma</label>
                        <input type="text" className="form-control" placeholder="Turma" name="turma" onChange={pegarValores}/>
                    </div>
                    <div className="form-group">
                        <label>CPF</label>
                        <input type="text" className="form-control" placeholder="CPF" name="cpf" onChange={pegarValores}/>
                    </div>
                </form>
            </div>
        </div>
    </>
}

export default CadastroAluno