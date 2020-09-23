package router

import "net/http"

// Router interface
type Router interface {
	GET(uri string, f func(w http.ResponseWriter, r *http.Request))
	POST(uri string, f func(w http.ResponseWriter, r *http.Request))
	PATCH(uri string, f func(w http.ResponseWriter, r *http.Request))
	DELETE(uri string, f func(w http.ResponseWriter, r *http.Request))
	USE(f func(next http.Handler) http.Handler)
	CORS(origins []string)
	STATIC(dir string, uris []string)
	SERVE(port string, idleTimeout uint16, readTimeout uint16, writeTimeout uint16)
}
