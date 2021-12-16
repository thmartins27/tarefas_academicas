import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroProfessor from "../src/pages/viewProfessor/cadastroProfessor"
import Professor from "../src/pages/viewProfessor/viewProfessor"
import AlterProfessor from "./pages/viewProfessor/alterProfessor";
import Aluno from "./pages/viewAlunos/viewAluno";
import CadastroAluno from "./pages/viewAlunos/CadastroAluno";
import Turma from "./pages/viewTurma/viewTurma";
import CadastroTurma from "./pages/viewTurma/CadastroTurma";
import App from "./App";

const Rota = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                {/* Professor */}
                <Route path="/professor/cadastro" element={<CadastroProfessor />} />
                <Route path="/professor" element={<Professor />} />
                <Route path="/professor/alter" element={<AlterProfessor />} />
                {/* Alunos*/}
                <Route path="/alunos" element={<Aluno />} />
                <Route path="/aluno/cadastro" element={<CadastroAluno />} />
                {/* Turma */}
                <Route path="/turma" element={<Turma />} />
                <Route path="/turma/cadastro" element={<CadastroTurma />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rota