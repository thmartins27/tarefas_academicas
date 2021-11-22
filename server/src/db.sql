#use dbtarefasacademicas;

/*
create table professor(
	id int auto_increment,
    cod_professor varchar(6) not null unique,
    nome varchar(50),
    sobrenome varchar(50),
    constraint pk_professor primary key(id)
);

create table alunos(
	id int auto_increment,
    matricula varchar(10) not null unique,
    nome varchar(60),
    sobrenome varchar(60),
    constraint pk_aluno primary key(id));

create table turma(
	id int auto_increment,
    id_turma varchar(5) not null unique,
    sala int,
    curso varchar(60),
    perido varchar(1),
    constraint pk_id primary key(id)
);

create table disciplina(
	id int auto_increment,
    id_materia varchar(6) not null unique,
    nome varchar(60) not null,
    area varchar(60),
    constraint pk_disciplina primary key(id)
);
create table grade(
	id int auto_increment,
    turma varchar(5),
    disciplina varchar(6),
    professor varchar(6),
    dia_aula varchar(13),
    constraint pk_grade primary key(id),
    constraint fk_grade_turma foreign key(turma)
    references turma(id_turma),
    constraint fk_grade_disciplina foreign key(disciplina)
    references disciplina(id_disciplina),
    constraint fk_grade_professor foreign key(professor)
    references professor(cod_professor)
);

create table provas(
    id int AUTO_INCREMENT,
    fk_disciplina varchar(6),
    data_prova datetime,
    fk_turma varchar(5),
    CONSTRAINT pk_provas PRIMARY KEY(id),
    CONSTRAINT fk_provas_disciplina FOREIGN KEY(fk_disciplina) REFERENCES disciplina(id_disciplina),
    CONSTRAINT fk_provas_turma FOREIGN KEY(fk_turma) REFERENCES turma(id_turma)
);



*/

drop table provas;

create table provas(
    id int auto_increment,
    cod_prova varchar(5) not null unique,
    fk_disciplina varchar(6) not null,
    fk_turma varchar(5) not null,
    data datetime,
    constraint pk_provas primary key(id, cod_prova),
    constraint fk_provas_turma foreign key(fk_turma) references turma(id_turma),
    constraint fk_provas_disciplina foreign key(fk_disciplina) references disciplina(id_disciplina));
use dbtarefasacademicas;

insert into provas(cod_prova, fk_disciplina, fk_turma, data)
VALUES('PODS1', 'POO201', 'ADS01', '2021-12-21');

select * from disciplina;
select * from grade;

#criação de tabelas


insert into disciplina(id_disciplina, nome, area) values('POOII1', 'Programação orientada a objeto', 'programação');
insert into disciplina(id_disciplina, nome, area) values('ANOO01', 'Analise orientada a objeto', 'Analise de sistemas');
insert into disciplina(id_disciplina, nome, area) values('BD0001', 'Banco de Dados', 'programação');
insert into disciplina(id_disciplina, nome, area) values('ENGSII', 'Engenharia de software II', 'Engenharia');
insert into disciplina(id_disciplina, nome, area) values('RDC001', 'Rede de computadores', 'Redes');
insert into disciplina(id_disciplina, nome, area) values('SO0001', 'Sistemas operacionais', 'Informatica');
insert into disciplina(id_disciplina, nome, area) values('MATC01', 'Matematica para computadores', 'Exatas');
insert into disciplina(id_disciplina, nome, area) values('TOPEOO', 'Topicos especiais de orientação a objeto', 'programação');

insert into grade(turma, disciplina, professor, dia_aula) values('ADS01', 'ANOO01', 'AAA001', 'Segunda-Feira');
insert into grade(turma, disciplina, professor, dia_aula) values('ADS01', 'RDC001', 'AAA001', 'Terça-Feira');
insert into grade(turma, disciplina, professor, dia_aula) values('ADS01', 'TOPEOO', 'AAA001', 'Quarta-Feira');
insert into grade(turma, disciplina, professor, dia_aula) values('ADS01', 'MATC01', 'AAA001', 'Quinta-Feira');


describe disciplina;
describe grade;


#criação de tabelas


#ALTER TABLE tabela_exemplo CHANGE id_exemplo novo_id_exemplo integer(5) unsigned;
alter table disciplina change id_materia id_disciplina varchar(6) not null unique;

alter table professor add materia varchar(60);

insert into turma(id_turma, sala, curso, perido) values('ADS01', 201, 'Analise e desenvolvimento de sistemas', 'N');

alter table alunos add turma varchar(5);
alter table alunos add constraint fk_turma foreign key(turma) referenceperidos turma(id_turma);

use dbapicarros;

use dbtarefasacademicas;

select * from professor;

select * from alunos;
select * from turma;

update professor set nome = 'Diego' where cod_professor = 'AAA003';

alter table professor drop column materia;

insert into professor(cod_professor, nome, sobrenome) values('AAA001', 'Jeff', 'Sena');

insert into alunos(matricula, nome, sobrenome, turma) values('UP20215891', 'Tyler', 'Roger', 'ADS01');
insert into alunos(matricula, nome, sobrenome) values('UP20215490', 'Raphael', 'Gonçalves');
insert into alunos(matricula, nome, sobrenome) values('UP20216501', 'Matheus', 'Cardoso');

update alunos set turma = 'ANS01' where id = 1;

show tables;
describe alunos; describe turma;

select * from turma;

ALTER TABLE turma CHANGE perido periodo varchar(1);

describe disciplina;
describe grade;


describe professor;
insert into professor(cod_professor, nome, sobrenome) values('AAA02', 'Rodeny', 'Victor');
insert into professor(cod_professor, nome, sobrenome) values('AAA03', 'Alan', 'Carlos');
insert into professor(cod_professor, nome, sobrenome) values('AAA04', 'Eduardo', 'Afonso');
insert into professor(cod_professor, nome, sobrenome) values('AAA05', 'Marcio', 'Silva');

select id_disciplina from disciplina;