const { Router } = require('express')
const EventoController = require('../Controller/EventoController')
const EnderecoController = require('../Controller/EnderecoController')
const ParticipanteController = require('../Controller/ParticipanteController.js')

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

module.exports = routes