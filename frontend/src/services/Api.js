import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true, // Adiciona cookies, caso necessário
})

export default api