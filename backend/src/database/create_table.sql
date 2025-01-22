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
    FOREIGN KEY (idEndereco) REFERENCES Endereco(idEndereco)
);

CREATE TABLE IF NOT EXISTS Responsavel (
    idResponsavel SERIAL PRIMARY KEY,
    nomeResponsavel VARCHAR(100),
    email VARCHAR(100),
    telefone VARCHAR(20),
    cpf VARCHAR(14)
);

CREATE TABLE IF NOT EXISTS Acao (
    idAcao SERIAL PRIMARY KEY,
    nomeAcao VARCHAR(100),
    tipoAcao VARCHAR(50),
    idResponsavel INT,
    valor DECIMAL(10, 2),
    numVagas INT,
    FOREIGN KEY (idResponsavel) REFERENCES Responsavel(idResponsavel)
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
    email VARCHAR(100),
    telefone VARCHAR(20),
    cpf VARCHAR(14),
    status VARCHAR(20),
    senha VARCHAR(50)
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
