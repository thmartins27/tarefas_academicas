import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Option from "./cardSelect"

const CadastroTurma = () => {

    const [cursos, setCurso] = useState()

    useEffect(() => {
        axios.get("http://localhost:5000/sa/turmas")
            .then(res => {
                setCurso(res.data.curso)
            })
    })

    const [value, setValue] = useState()

    const pegarValores = value => {
        setValue(prevValues => ({
            ...prevValues,
            [value.target.name]: value.target.value
        }))
    }

    const enviarDados = () =>{
        axios.post("http://localhost:5000/sa/turma", {
            turma: value.turma,
            periodo: value.periodo,
            curso: value.curso,
            data: value.data,
            sala: value.sala
        }).then(res => {
            let erro = res.data.erro
            let result = res.data.results
            
            if(erro) alert(erro)
            else alert(result)
        })
    }

    return (<>
        <div className="container">
            <h2>Turma</h2>
            <nav className="content-nav">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link className="nav-link" to="/turma">
                            <button className="btn btn-primary">Voltar</button>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a hrf="#" className="nav-link">
                            <button onClick={enviarDados} className="btn btn-primary">Salvar</button>
                        </a>
                    </li>
                </ul>
            </nav>
            <br />
            <div className="container">
                <div className="form-inline">
                    <label className="mr-sm-2">ID Tuma</label>
                    <input className="form-control col-5" type="text" name="turma" placeholder="ID TUrma" onChange={pegarValores} />
                </div>
                <div className="form-check">
                    <input type="radio" name="periodo" id="" className="form-check-input" value="D" onChange={pegarValores} />
                    <label className="form-check-label">Diurno</label>
                </div>
                <div className="form-check">
                    <input type="radio" name="periodo" id="" className="form-check-input" value="V" onChange={pegarValores} />
                    <label className="form-check-label">Vespertino</label>
                </div>
                <div className="form-check">
                    <input type="radio" name="periodo" id="" className="form-check-input" value="N" onChange={pegarValores} />
                    <label className="form-check-label">Noturno</label>
                </div>

                <br />

                <div className="input-group mb-3">
                    <div class="input-group-prepend col-10">
                        <label class="input-group-text" for="inputGroupSelect01">Curso</label>
                        <select name="custom-select" name="curso" id="">
                            <option value="" selected>Choose...</option>
                            {typeof cursos !== 'undefined' && cursos.map(value => {
                                return (
                                    <Option
                                        codigo={value.codigo}
                                        descricao={value.descricao}
                                    />
                                )
                            })}
                        </select>
                    </div>
                </div>

                <div className="form-inline">
                    <label className="mr-sm-2">Sala</label>
                    <input type="text" placeholder="Sala" name="sala" maxLength="6" className="form-control mb-2 mr-sm-2"/>
                </div>

                <div className="form-group">
                    <label>Inicio:</label><br />
                    <input className="form-date" onChange={pegarValores} type="date" name="data" />
                </div>
            </div>

        </div>
    </>)
}

export default CadastroTurma