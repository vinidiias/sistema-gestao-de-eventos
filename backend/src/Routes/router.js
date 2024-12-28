const { Router } = require('express')
const EventoController = require('../Controller/EventoController')

const routes = Router()

routes.post('/evento', EventoController.create)

