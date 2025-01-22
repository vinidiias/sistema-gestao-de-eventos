const { Router } = require('express')
const EventoController = require('../Controller/EventoController')
const EnderecoController = require('../Controller/EnderecoController')

const routes = Router()

//Eventos CRUD
routes.post('/evento', EventoController.create)
routes.get('/eventos', EventoController.index)
routes.put('/evento/:id', EventoController.update)
routes.delete('/evento/:id', EventoController.delete)

//Endereco
routes.post('/endereco', EnderecoController.create)

module.exports = routes