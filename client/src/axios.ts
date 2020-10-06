import axios from 'axios'

const httpClient = axios.create({
	// baseURL: process.env.APP_API_BASE_URL,
	// or use window.location.host
	baseURL: 'http://localhost:8080/api',
	timeout: 3000,
})

export default httpClient
