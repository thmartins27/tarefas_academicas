import { Link } from "react-router-dom"
import axios from "axios"

const CardTurma = (props) => {
    return (<>
        <script src="https://unpkg.com/boxicons@2.1.1/dist/boxicons.js"></script>
            <tr>
                <td>{props.turma}</td>
                <td>{props.sala}</td>
                <td>{props.curso}</td>
                <td>{props.periodo}</td>
                <td>{props.data}</td>
                <button onClick={() => {
                    axios.delete(`http://localhost:5000/sa/turma/${props.turma}`)
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
    </>)
}

export default CardTurma