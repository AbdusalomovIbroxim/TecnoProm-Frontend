import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        // Authorization: 'Bearer ',
        "Content-Type": 'application/json'
    }
})

export default api;