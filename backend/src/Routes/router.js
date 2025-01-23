const { Router } = require('express')
const EventoController = require('../Controller/EventoController')
const EnderecoController = require('../Controller/EnderecoController')
const ParticipanteController = require('../Controller/ParticipanteController.js')
const ParticipanteEventoController = require('../Controller/ParticipanteEventoController.js')
const TipoAcaoController = require('../Controller/TipoAcaoController.js')
const ResponsavelController = require('../Controller/ResponsavelController.js')
const AcaoController = require('../Controller/AcaoController.js')

const routes = Router()

//Eventos CRUD
routes.post('/evento', EventoController.create)
routes.get('/evento', EventoController.index)
routes.put('/evento/:id', EventoController.update)
routes.delete('/evento/:id', EventoController.delete)

//Endereco
routes.post('/endereco', EnderecoController.create)
routes.get('/endereco', EnderecoController.index)
routes.put('/endereco/:id', EnderecoController.update)
routes.delete('/endereco/:id', EnderecoController.delete)

//Participante CRUD
routes.post('/participante', ParticipanteController.create)
routes.get('/participante', ParticipanteController.index)
routes.put('/participante/:id', ParticipanteController.update)
routes.delete('/participante/:id', ParticipanteController.delete)

//ParticiapnteEvento
routes.post('/participanteevento/:idevento/:idparticipante', ParticipanteEventoController.create)
routes.get('/participanteevento/:idevento', ParticipanteEventoController.index)
routes.put('/participanteevento/:idevento', ParticipanteEventoController.update)

//TipoAcao
routes.post('/tipoacao', TipoAcaoController.create)
routes.get('/tipoacao', TipoAcaoController.index)
routes.delete('/tipoacao/:idTipoAcao', TipoAcaoController.delete)

//Responsavel
routes.post('/responsavel', ResponsavelController.create)
routes.get('/responsavel', ResponsavelController.index)
routes.put('/responsavel/:idResponsavel', ResponsavelController.update)
routes.delete('/responsavel/:idResponsavel', ResponsavelController.delete)

//Acao
routes.post('/acao', AcaoController.create)
routes.get('/acao', AcaoController.index)
routes.put('/acao/:idAcao', AcaoController.update)
routes.post('/acao/:idAcao', AcaoController.delete)


//AcaoEvento


//ParticipanteAcaoEvento



module.exports = routes