import React from "react";
import Axios from "axios"
import 'boxicons'
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CardProfessor(props) {
    return (
        <>
            <script src="https://unpkg.com/boxicons@2.1.1/dist/boxicons.js"></script>
            <tr>
                <td>{props.codigo}</td>
                <td>{props.nome}</td>
                <td>{props.sobrenome}</td>
                <button onClick={() => {
                    Axios.delete(`http://localhost:5000/sa/professor/${props.codigo}`)
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