-- Criação do banco de dados
CREATE DATABASE FioVital;
USE FioVital;

-- Tabela de Pacientes
CREATE TABLE Pacientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    data_nascimento DATE,
    telefone VARCHAR(15),
    historico_medico TEXT
);

-- Tabela de Cuidadores
CREATE TABLE Cuidadores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(15),
    email VARCHAR(100),
    especialidades VARCHAR(200)
);

-- Tabela que relaciona Pacientes com Cuidadores
CREATE TABLE Paciente_Cuidador (
    paciente_id INT,
    cuidador_id INT,
    PRIMARY KEY (paciente_id, cuidador_id),
    FOREIGN KEY (paciente_id) REFERENCES Pacientes(id),
    FOREIGN KEY (cuidador_id) REFERENCES Cuidadores(id)
);

-- Tabela de Monitoramentos
CREATE TABLE Monitoramentos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    paciente_id INT NOT NULL,
    data_hora DATETIME NOT NULL,
    frequencia_cardiaca INT NOT NULL,
    FOREIGN KEY (paciente_id) REFERENCES Pacientes(id)
);

-- Tabela de Alertas
CREATE TABLE Alertas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    paciente_id INT NOT NULL,
    monitoramento_id INT,
    data_hora DATETIME NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    descricao TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'Pendente',
    FOREIGN KEY (paciente_id) REFERENCES Pacientes(id),
    FOREIGN KEY (monitoramento_id) REFERENCES Monitoramentos(id)
);

-- Tabela que relaciona Alertas com Cuidadores
CREATE TABLE Alerta_Cuidador (
    alerta_id INT,
    cuidador_id INT,
    PRIMARY KEY (alerta_id, cuidador_id),
    FOREIGN KEY (alerta_id) REFERENCES Alertas(id),
    FOREIGN KEY (cuidador_id) REFERENCES Cuidadores(id)
);