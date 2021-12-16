import axios from "axios";
import 'boxicons'
import { Link } from "react-router-dom";

const CardAluno = (props) => {
    return (
        <>
             <script src="https://unpkg.com/boxicons@2.1.1/dist/boxicons.js"></script>
            <tr>
                <td>{props.matricula}</td>
                <td>{props.nome}</td>
                <td>{props.sobrenome}</td>
                <td>{props.turma}</td>
                <td>{props.cpf}</td>
                <button onClick={() => {
                    axios.delete(`http://localhost:5000/sa/aluno/${props.matricula}`)
                        .then(res => {
                            if (res.data.erro != "") alert(res.data.erro)
                            else alert(res.data.results)
                        })
                }} className="btn btn-danger">Delete</button>
                <Link to="/professor/alter">
                    <button className="btn btn-warning">
                        <box-icon type='solid' name='edit'></box-icon>
                    </button>
                </Link>
            </tr>
        </>
    )
}

export default CardAluno