import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api-cadastro-usuario-74h8.onrender.com/usuarios'



})

export default api