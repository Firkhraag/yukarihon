import axios from 'axios'

const httpClient = axios.create({
	// baseURL: process.env.APP_API_BASE_URL,
	// or use window.location.host
	baseURL: 'https://yukarihon.ru:5000/api',
	timeout: 3000,
})

export default httpClient
