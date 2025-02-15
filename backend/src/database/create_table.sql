CREATE TABLE IF NOT EXISTS Endereco (
    idEndereco SERIAL PRIMARY KEY,
    CEP VARCHAR(10),
    rua VARCHAR(100),
    cidade VARCHAR(50),
    bairro VARCHAR(50),
    complemento VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Evento (
    idEvento SERIAL PRIMARY KEY,
    nomeEvento VARCHAR(100),
    dataInicio DATE,
    dataFim DATE,
    idEndereco INT,
    horario VARCHAR(10)
    FOREIGN KEY (idEndereco) REFERENCES Endereco(idEndereco)
);

CREATE TABLE IF NOT EXISTS Usuario (
    idusuario SERIAL PRIMARY KEY,
    email VARCHAR(100),
    senha VARCHAR(100),
    firstlogin BOOLEAN
);

CREATE TABLE IF NOT EXISTS Responsavel (
    idParticipante SERIAL PRIMARY KEY,
    nomeResponsavel VARCHAR(100),
    telefone VARCHAR(20),
    cpf VARCHAR(14)
    FOREIGN KEY (idusuario) REFERENCES Usuario(idUsuario)

);

CREATE TABLE IF NOT EXISTS Acao (
    idAcao SERIAL PRIMARY KEY,
    nomeAcao VARCHAR(100),
    tipoAcao VARCHAR(50),
    idParticipante INT,
    valor VARCHAR(50),
    numVagas INT,
    horario VARCHAR(10)
    FOREIGN KEY (idParticipante) REFERENCES Participante(idParticipante)
);

CREATE TABLE IF NOT EXISTS AcaoEvento (
    idEvento INT,
    idAcao INT,
    dataInicio DATE,
    dataFim DATE,
    vagasPreenchidas INT,
    PRIMARY KEY (idEvento, idAcao),
    FOREIGN KEY (idEvento) REFERENCES Evento(idEvento),
    FOREIGN KEY (idAcao) REFERENCES Acao(idAcao)
);

CREATE TABLE IF NOT EXISTS Participante (
    idParticipante SERIAL PRIMARY KEY,
    nomeParticipante VARCHAR(100),
    telefone VARCHAR(20),
    cpf VARCHAR(14),
    FOREIGN KEY (idusuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE IF NOT EXISTS TipoAcao (
    idTipoAcao SERIAL PRIMARY KEY,
    nomeTipoAcao VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS ParticipanteEvento (
    idEvento INT,
    idParticipante INT,
    statusParticipanteEvento VARCHAR(50),
    PRIMARY KEY (idEvento, idParticipante),
    FOREIGN KEY (idEvento) REFERENCES Evento(idEvento),
    FOREIGN KEY (idParticipante) REFERENCES Participante(idParticipante)
);

CREATE TABLE IF NOT EXISTS ParticipanteAcaoEvento (
    idEvento INT,
    idAcao INT,
    idParticipante INT,
    statusInscricao VARCHAR(50),
    dataInscricao DATE,
    PRIMARY KEY (idEvento, idAcao, idParticipante),
    FOREIGN KEY (idEvento, idAcao) REFERENCES AcaoEvento(idEvento, idAcao),
    FOREIGN KEY (idParticipante) REFERENCES Participante(idParticipante)
);
