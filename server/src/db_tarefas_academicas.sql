--comando para backup
--mysqldump -u root -p dbtarefasacademicas > c:\Users\Thiago\desktop\tarefas\tarefas_academicas\backup.sq

DROP DATABASE IF EXISTS `db_tarefas_academicas`;
CREATE DATABASE `db_tarefas_academicas`;
use `db_tarefas_academicas`;

DROP TABLE IF EXISTS `professor`;

CREATE TABLE `professor`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `cod_professor` VARCHAR(6) NOT NULL UNIQUE,
    `nome` VARCHAR(255) NOT NULL,
    `sobrenome` VARCHAR(60) NOT NULL,
    CONSTRAINT `pk_professor` PRIMARY KEY(`id`, `cod_professor`),
);

DROP TABLE IF EXISTS `curso`;
CREATE TABLE `curso`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `cod_curso` VARCHAR(6) NOT NULL UNIQUE,
    `nome_curso` VARCHAR(120) NOT NULL,
    `qtd_periodo` INT,
    CONSTRAINT `pk_curso` PRIMARY KEY(`id`, `cod_curso`)
);

DROP TABLE IF EXISTS `turma`;
CREATE TABLE `turma`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `id_turma` VARCHAR(6) NOT NULL UNIQUE,
    `data_inicio` DATETIME,
    `periodo` VARCHAR(1),
    `fk_curso` VARCHAR(6),
    CONSTRAINT `pk_turma` PRIMARY KEY(`id`, `id_turma`),
    CONSTRAINT `pk_turma_curso` FOREIGN KEY(`fk_curso`) REFERENCES `curso`(`cod_curso`)
);

DROP TABLE IF EXISTS `aluno`;


INSERT INTO `professor`(`cod_professor`, `nome`, `sobrenome`) VALUES('AAA001', 'JEFF', 'SENA');
INSERT INTO `professor`(`cod_professor`, `nome`, `sobrenome`) VALUES('BBB001', 'RODNEY', 'VICTOR');
INSERT INTO `professor`(`cod_professor`, `nome`, `sobrenome`) VALUES('CCC001', 'ALAN', 'CARLOS');
INSERT INTO `professor`(`cod_professor`, `nome`, `sobrenome`) VALUES('DDD001', 'CARLOS', 'ELI');

INSERT INTO `curso`(`cod_curso`, `nome_curso`, `qtd_periodo`) VALUES('ADS', 'Analise e Desenvolvimento de Sistemas', 5);
INSERT INTO `curso`(`cod_curso`, `nome_curso`, `qtd_periodo`) VALUES('SIN', 'Sistema de Informações', 5);

INSERT INTO `turma`(`id_turma`, `data_inicio`, `periodo`, `fk_curso`) VALUES('ADS211', '2021-02-11', 'N', 'ADS');
INSERT INTO `turma`(`id_turma`, `data_inicio`, `periodo`, `fk_curso`) VALUES('SIN212', '2021-08-11', 'N', 'SIN');