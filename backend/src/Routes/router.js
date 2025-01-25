const { Router } = require('express')
const EventoController = require('../Controller/EventoController')
const EnderecoController = require('../Controller/EnderecoController')
const ParticipanteController = require('../Controller/ParticipanteController.js')
const ParticipanteEventoController = require('../Controller/ParticipanteEventoController.js')
const TipoAcaoController = require('../Controller/TipoAcaoController.js')
const ResponsavelController = require('../Controller/ResponsavelController.js')
const AcaoController = require('../Controller/AcaoController.js')
const AcaoEventoController = require('../Controller/AcaoEventoController.js')
const UsuarioController = require('../Controller/UsuarioController.js')
const SessaoController = require('../Controller/SessaoController.js')
const ParticipanteAcaoEventoController = require('../Controller/ParticipanteAcaoEventoController.js')

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
routes.get('acaotipo', AcaoController.listAcoesPorTipo)
routes.put('/acao/:idAcao', AcaoController.update)
routes.delete('/acao/:idAcao', AcaoController.delete)


//AcaoEvento
routes.post('/acaoevento/:idEvento/:idAcao', AcaoEventoController.create)
routes.get('/acaoevento/:idEvento', AcaoEventoController.index)
routes.put('/acao/:idEvento/:idAcao', AcaoEventoController.update)

//Usuario
routes.post('/usuario', UsuarioController.create)
routes.get('/usuario', UsuarioController.index)

//Sessao
routes.post('/sessao', SessaoController.login)

//ParticipanteAcaoEvento
routes.post('/participanteacaoevento/:idAcao/:idEvento/:idParticipante', ParticipanteAcaoEventoController.create)


module.exports = routes