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
func (r *router) CORS(origins []string) {
	r.mux.Use(handlers.CORS(handlers.AllowedOrigins(origins)))
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

// Starting the server
func (r *router) SERVE(port string, idleTimeout uint16, readTimeout uint16, writeTimeout uint16) {
	// Http server
	s := &http.Server{
		Addr:         fmt.Sprintf(":%s", port),
		Handler:      r.mux,
		IdleTimeout:  time.Duration(idleTimeout) * time.Second,
		ReadTimeout:  time.Duration(readTimeout) * time.Second,
		WriteTimeout: time.Duration(writeTimeout) * time.Second,
	}
	// Goroutine for graceful shutdown
	go func() {
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
