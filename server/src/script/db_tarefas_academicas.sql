#comando para backup
#mysqldump -u root -p dbtarefasacademicas > c:\Users\Thiago\desktop\tarefas\tarefas_academicas\backup.sq

DROP DATABASE IF EXISTS db_tarefas_academicas;
CREATE DATABASE db_tarefas_academicas;
use db_tarefas_academicas;

DROP TABLE IF EXISTS dia_semana;
CREATE TABLE dia_semana(
	id INT NOT NULL,
    dia VARCHAR(13) NOT NULL UNIQUE,
    CONSTRAINT pk_diaSemana PRIMARY KEY(id)
);

DROP TABLE IF EXISTS professor;
CREATE TABLE professor(
    id INT NOT NULL AUTO_INCREMENT,
    cod_professor VARCHAR(6) NOT NULL UNIQUE,
    nome VARCHAR(255) NOT NULL,
    sobrenome VARCHAR(60) NOT NULL,
    CONSTRAINT pk_professor PRIMARY KEY(id, cod_professor)
);

DROP TABLE IF EXISTS curso;
CREATE TABLE curso(
    id INT NOT NULL AUTO_INCREMENT,
    cod_curso VARCHAR(6) NOT NULL UNIQUE,
    nome_curso VARCHAR(120) NOT NULL,
    qtd_periodo INT,
    CONSTRAINT pk_curso PRIMARY KEY(id, cod_curso)
);

DROP TABLE IF EXISTS disciplina;
CREATE TABLE disciplina(
	id INT NOT NULL AUTO_INCREMENT,
    cod_disciplina VARCHAR(6) NOT NULL UNIQUE,
    descricao VARCHAR(120) NOT NULL,
    area varchar(120),
    CONSTRAINT pk_disciplina PRIMARY KEY(id, cod_disciplina)
);

DROP TABLE IF EXISTS turma;
CREATE TABLE turma(
    id INT NOT NULL AUTO_INCREMENT,
    id_turma VARCHAR(6) NOT NULL UNIQUE,
    data_inicio DATETIME,
    periodo VARCHAR(1),
    fk_curso VARCHAR(6),
    CONSTRAINT pk_turma PRIMARY KEY(id, id_turma),
    CONSTRAINT pk_turma_curso FOREIGN KEY(fk_curso) REFERENCES curso(cod_curso)
);

DROP TABLE IF EXISTS aluno;
CREATE TABLE aluno(
    id INT NOT NULL AUTO_INCREMENT,
    matricula VARCHAR(10) NOT NULL UNIQUE,
    nome VARCHAR(255) NOT NULL,
    sobrenome VARCHAR(60) NOT NULL,
    cpf VARCHAR(60),
    fk_turma VARCHAR(6),
    CONSTRAINT pk_alunos PRIMARY KEY(id, matricula),
    CONSTRAINT fk_aluno_turma FOREIGN KEY(fk_turma) REFERENCES turma(id_turma)
);

DROP TABLE IF EXISTS grade;
CREATE TABLE grade(
	id INT NOT NULL AUTO_INCREMENT,
    fk_dia INT NOT NULL,
    fk_turma VARCHAR(6) NOT NULL,
	fk_professor VARCHAR(6) NOT NULL,
    fk_disciplina VARCHAR(6) NOT NULL,
    CONSTRAINT pk_grade PRIMARY KEY(id),
    CONSTRAINT fk_grade_dia FOREIGN KEY(fk_dia) REFERENCES dia_semana(id),
    CONSTRAINT fk_grade_turma FOREIGN KEY(fk_turma) REFERENCES turma(id_turma),
    CONSTRAINT fk_grade_professor FOREIGN KEY(fk_professor) REFERENCES professor(cod_professor),
    CONSTRAINT fk_grade_disciplina FOREIGN KEY(fk_disciplina) REFERENCES disciplina(cod_disciplina)
);

DROP TABLE IF EXISTS prova;
CREATE TABLE prova(
	id INT NOT NULL AUTO_INCREMENT,
    data_prova DATE NOT NULL,
    fk_disciplina_turma VARCHAR(6) NOT NULL,
    fk_turma VARCHAR(6) NOT NULL,
    CONSTRAINT pk_prova PRIMARY KEY(id),
    CONSTRAINT fk_prova_disciplina_turma FOREIGN KEY(fk_disciplina_turma) REFERENCES grade(fk_disciplina),
    CONSTRAINT fk_prova_turma FOREIGN KEY(fk_turma) REFERENCES turma(id_turma)
);

DROP TABLE IF EXISTS evento;
CREATE TABLE evento(
    id INT NOT NULL AUTO_INCREMENT,
    cod_evento VARCHAR(6) NOT NULL UNIQUE,
    descricao VARCHAR(255) NOT NULL,
    data_evento DATE NOT NULL,
    aberto INT NOT NULL,
    fk_disciplina VARCHAR(6),
    fk_turma VARCHAR(6),
    fk_professor VARCHAR(6),
    CONSTRAINT pk_evento PRIMARY KEY(id),
    CONSTRAINT fk_evento_disciplina FOREIGN KEY(fk_disciplina) REFERENCES disciplina(cod_disciplina),
    CONSTRAINT fk_evento_turma FOREIGN KEY(fk_turma) REFERENCES turma(id_turma),
    CONSTRAINT fk_evento_professor FOREIGN KEY(fk_professor) REFERENCES professor(cod_professor)
);

INSERT INTO dia_semana(id, dia) VALUES(1, 'Domingo');
INSERT INTO dia_semana(id, dia) VALUES(2, 'Segunda-Feira');
INSERT INTO dia_semana(id, dia) VALUES(3, 'Terça-Feira');
INSERT INTO dia_semana(id, dia) VALUES(4, 'Quarta-Feira');
INSERT INTO dia_semana(id, dia) VALUES(5, 'Quinta-Feira');
INSERT INTO dia_semana(id, dia) VALUES(6, 'Sexta-Feira');
INSERT INTO dia_semana(id, dia) VALUES(7, 'Sábado');

INSERT INTO professor(cod_professor, nome, sobrenome) VALUES('AAA001', 'JEFF', 'SENA');
INSERT INTO professor(cod_professor, nome, sobrenome) VALUES('BBB001', 'RODNEY', 'VICTOR');
INSERT INTO professor(cod_professor, nome, sobrenome) VALUES('CCC001', 'ALAN', 'CARLOS');
INSERT INTO professor(cod_professor, nome, sobrenome) VALUES('DDD001', 'CARLOS', 'ELI');

INSERT INTO curso(cod_curso, nome_curso, qtd_periodo) VALUES('ADS', 'Analise e Desenvolvimento de Sistemas', 5);
INSERT INTO curso(cod_curso, nome_curso, qtd_periodo) VALUES('SIN', 'Sistema de Informações', 5);

INSERT INTO disciplina(cod_disciplina, descricao, area) VALUES('POOI', 'Programação orientada a objetos 1', 'Programação');
INSERT INTO disciplina(cod_disciplina, descricao, area) VALUES('ENGSI', 'Engenharia de software 1', 'Engenharia');
INSERT INTO disciplina(cod_disciplina, descricao, area) VALUES('RDC', 'Rede de Computadores', 'Rede');
INSERT INTO disciplina(cod_disciplina, descricao, area) VALUES('BCD', 'Banco de Dados', 'Programação');
INSERT INTO disciplina(cod_disciplina, descricao, area) VALUES('SID', 'Segurança de informaçoes e dados', 'Sistema da Informação');
INSERT INTO disciplina(cod_disciplina, descricao, area) VALUES('PWEB', 'Programação Web', 'Programação');
INSERT INTO disciplina(cod_disciplina, descricao, area) VALUES('TOPPOO', 'Topicos de Programação orientada a objeto', 'Programação');
INSERT INTO disciplina(cod_disciplina, descricao, area) VALUES('SIOP', 'Sistemas Operacionais', 'Sistema da Informação');
INSERT INTO disciplina(cod_disciplina, descricao, area) VALUES('PIM', 'Projeto Integrador Multidiciplinar', 'PIM');
INSERT INTO turma(id_turma, data_inicio, periodo, fk_curso) VALUES('ADS211', '2021-02-11', 'N', 'ADS');
INSERT INTO turma(id_turma, data_inicio, periodo, fk_curso) VALUES('SIN212', '2021-08-11', 'N', 'SIN');

INSERT INTO aluno(matricula, nome, sobrenome, cpf, fk_turma) VALUES('UP20214389', 'Thiago de Oliveira Martins', 'Martins', '04334577245', 'ADS211');
INSERT INTO aluno(matricula, nome, sobrenome, cpf, fk_turma) VALUES('UP20218943', 'Calinhos da Silva Maia', 'Maia', '89461578502', 'ADS211');
INSERT INTO aluno(matricula, nome, sobrenome, cpf, fk_turma) VALUES('UP20218502', 'Diana Moreno Cabelo', 'Cabelo', '74563251987', 'SIN212');
INSERT INTO grade(fk_dia, fk_turma, fk_professor, fk_disciplina) VALUES(2, 'ADS211', 'AAA001', 'PWEB');
INSERT INTO grade(fk_dia, fk_turma, fk_professor, fk_disciplina) VALUES(3, 'ADS211', 'CCC001', 'ENGSI');
INSERT INTO grade(fk_dia, fk_turma, fk_professor, fk_disciplina) VALUES(4, 'ADS211', 'BBB001', 'POOI');
INSERT INTO grade(fk_dia, fk_turma, fk_professor, fk_disciplina) VALUES(5, 'ADS211', 'BBB001', 'TOPPOO');
INSERT INTO grade(fk_dia, fk_turma, fk_professor, fk_disciplina) VALUES(2, 'SIN212', 'DDD001', 'SIOP');
INSERT INTO grade(fk_dia, fk_turma, fk_professor, fk_disciplina) VALUES(3, 'SIN212', 'DDD001', 'BCD');
INSERT INTO grade(fk_dia, fk_turma, fk_professor, fk_disciplina) VALUES(4, 'SIN212', 'CCC001', 'ENGSI');
INSERT INTO grade(fk_dia, fk_turma, fk_professor, fk_disciplina) VALUES(5, 'SIN212', 'AAA001', 'SID');

INSERT INTO prova(data_prova, fk_disciplina_turma, fk_turma) VALUES('2021-02-08', 'PWEB', 'ADS211');
INSERT INTO prova(data_prova, fk_disciplina_turma, fk_turma) VALUES('2021-02-09', 'ENGSI', 'ADS211');
INSERT INTO prova(data_prova, fk_disciplina_turma, fk_turma) VALUES('2021-02-10', 'POOI', 'ADS211');
INSERT INTO prova(data_prova, fk_disciplina_turma, fk_turma) VALUES('2021-02-11', 'TOPPOO', 'ADS211');

INSERT INTO evento(cod_evento, descricao, data_evento, aberto) VALUES('EVE001', 'Palestra - Analise de Diagramas de Classe', '2021-12-20', 1);

DROP USER IF EXISTS 'saTarefas'@'localhost';
CREATE USER 'saTarefas'@'localhost' identified BY '_8280';

GRANT SELECT ON db_tarefas_academicas.* TO 'saTarefas'@'localhost';

GRANT INSERT ON db_tarefas_academicas.professor TO 'saTarefas'@'localhost';
GRANT INSERT ON db_tarefas_academicas.curso TO 'saTarefas'@'localhost';
GRANT INSERT ON db_tarefas_academicas.turma TO 'saTarefas'@'localhost';
GRANT INSERT ON db_tarefas_academicas.grade TO 'saTarefas'@'localhost';
GRANT INSERT ON db_tarefas_academicas.aluno TO 'saTarefas'@'localhost';
GRANT INSERT ON db_tarefas_academicas.prova TO 'saTarefas'@'localhost';
GRANT INSERT ON db_tarefas_academicas.disciplina TO 'saTarefas'@'localhost';
GRANT INSERT ON db_tarefas_academicas.evento TO 'saTarefas'@'localhost';

GRANT UPDATE ON db_tarefas_academicas.professor TO 'saTarefas'@'localhost';
GRANT UPDATE ON db_tarefas_academicas.curso TO 'saTarefas'@'localhost';
GRANT UPDATE ON db_tarefas_academicas.turma TO 'saTarefas'@'localhost';
GRANT UPDATE ON db_tarefas_academicas.grade TO 'saTarefas'@'localhost';
GRANT UPDATE ON db_tarefas_academicas.aluno TO 'saTarefas'@'localhost';
GRANT UPDATE ON db_tarefas_academicas.prova TO 'saTarefas'@'localhost';
GRANT UPDATE ON db_tarefas_academicas.disciplina TO 'saTarefas'@'localhost';
GRANT UPDATE ON db_tarefas_academicas.evento TO 'saTarefas'@'localhost';

GRANT DELETE ON db_tarefas_academicas.professor TO 'saTarefas'@'localhost';
GRANT DELETE ON db_tarefas_academicas.curso TO 'saTarefas'@'localhost';
GRANT DELETE ON db_tarefas_academicas.turma TO 'saTarefas'@'localhost';
GRANT DELETE ON db_tarefas_academicas.grade TO 'saTarefas'@'localhost';
GRANT DELETE ON db_tarefas_academicas.aluno TO 'saTarefas'@'localhost';
GRANT DELETE ON db_tarefas_academicas.prova TO 'saTarefas'@'localhost';
GRANT DELETE ON db_tarefas_academicas.disciplina TO 'saTarefas'@'localhost';
GRANT DELETE ON db_tarefas_academicas.evento TO 'saTarefas'@'localhost';

ALTER USER 'saTarefas'@'localhost' IDENTIFIED WITH mysql_native_password BY '_8280';
FLUSH PRIVILEGES;