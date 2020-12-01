import axios from 'axios'

const httpClient = axios.create({
	baseURL: 'https://yukarihon.ru:5000/api',
	// baseURL: 'localhost:8080/api',
	timeout: 3000,
})

export default httpClient
