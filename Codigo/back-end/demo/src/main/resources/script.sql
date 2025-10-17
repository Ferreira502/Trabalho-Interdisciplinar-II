CREATE TABLE paciente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    data_nascimento DATE NOT NULL,
    historico_medico TEXT,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE cuidador (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    data_nascimento DATE NOT NULL,
    especialidade VARCHAR(100),
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE batimento (
    id SERIAL PRIMARY KEY,
    batimento INTEGER,
    hora VARCHAR(10)
);

