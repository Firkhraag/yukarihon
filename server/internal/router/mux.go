package router

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type router struct {
	mux *mux.Router
}

// NewMuxRouter creates a new instance of a router
func NewMuxRouter() Router {
	return &router{
		mux.NewRouter(),
	}
}

// GET endpoints
func (r *router) GET(uri string, f func(w http.ResponseWriter, r *http.Request)) {
	r.mux.HandleFunc(uri, f).Methods("GET")
}

// POST endpoints
func (r *router) POST(uri string, f func(w http.ResponseWriter, r *http.Request)) {
	r.mux.HandleFunc(uri, f).Methods("POST")
}

// PATCH endpoints
func (r *router) PATCH(uri string, f func(w http.ResponseWriter, r *http.Request)) {
	r.mux.HandleFunc(uri, f).Methods("PATCH")
}

// DELETE endpoints
func (r *router) DELETE(uri string, f func(w http.ResponseWriter, r *http.Request)) {
	r.mux.HandleFunc(uri, f).Methods("DELETE")
}

// Middleware
func (r *router) USE(f func(next http.Handler) http.Handler) {
	r.mux.Use(f)
}

// Cross-Origin Resource Sharing
func (r *router) CORS(originsArr []string) {
	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins(originsArr)
	r.mux.Use(handlers.CORS(headers, methods, origins))
}

// Static files and frontend endpoints
func (r *router) STATIC(dir string, uris []string) {
	// Static files
	fileServer := http.FileServer(http.Dir(dir))
	r.mux.Handle("/", fileServer).Methods("GET")
	r.mux.PathPrefix("/assets/").Handler(
		http.StripPrefix("/assets/",
			http.FileServer(
				http.Dir(fmt.Sprintf("%s/assets", dir)),
			),
		),
	).Methods("GET")

	// Paths without variables
	for _, uri := range uris {
		r.mux.Handle(uri, http.StripPrefix(uri, fileServer)).Methods("GET")
	}

	// Paths with variables !!!
	r.mux.HandleFunc("/chat/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := mux.Vars(r)["id"]
		http.StripPrefix(fmt.Sprintf("/chat/%s", id), fileServer).ServeHTTP(w, r)
	}).Methods("GET")
}

func (r *router) STATIC2(dir string) {
	// Static files
	fileServer := http.FileServer(http.Dir(dir))
	// r.mux.Handle("/api/660401b2-4e2b-4968-8b46-3a83dd2a724d738a66fa-9f70-45b2-a29e-fbd8f524233fbf595db0-ace0-48d5-b546-472863de1e6d411a83b5-a8a4-47e0-9f2d-7e8ba7979342", fileServer).Methods("GET")

	r.mux.Handle("/api/663a83dd2a724d738a66fafbd8f524233fbf595db0472863de1e6d411a83b5", http.StripPrefix("/api/663a83dd2a724d738a66fafbd8f524233fbf595db0472863de1e6d411a83b5", fileServer)).Methods("GET")
	r.mux.PathPrefix("/assets/").Handler(
		http.StripPrefix("/assets/",
			http.FileServer(
				http.Dir(fmt.Sprintf("%s/assets", dir)),
			),
		),
	).Methods("GET")
}

// Starting the server
func (r *router) SERVE(port string, idleTimeout uint16, readTimeout uint16, writeTimeout uint16) {
	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"})
	origins := handlers.AllowedOrigins([]string{"*"})
	// Http server
	s := &http.Server{
		Addr:         fmt.Sprintf(":%s", port),
		Handler:      handlers.CORS(headers, methods, origins)(r.mux),
		IdleTimeout:  time.Duration(idleTimeout) * time.Second,
		ReadTimeout:  time.Duration(readTimeout) * time.Second,
		WriteTimeout: time.Duration(writeTimeout) * time.Second,
	}
	// Goroutine for graceful shutdown
	go func() {
		// Production
		// if err := s.ListenAndServeTLS("/app/letsencrypt/fullchain.pem", "/app/letsencrypt/privkey.pem"); err != nil {
		// Development
		if err := s.ListenAndServe(); err != nil {
			log.Fatal(err)
		}
	}()

	// Channel for iterruption signals
	sigChan := make(chan os.Signal)
	signal.Notify(sigChan, os.Interrupt)
	signal.Notify(sigChan, os.Kill)

	// Waiting a signal
	sig := <-sigChan
	log.Println("Received terminate, graceful shutdown", sig)

	// 30 seconds for shutdown
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(30)*time.Second)
	defer cancel()
	if err := s.Shutdown(ctx); err != nil {
		log.Fatal(err)
	}
}
