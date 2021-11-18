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

*/

#criação de tabelas






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


