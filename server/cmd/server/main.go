package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/firkhraag/yukari/internal/controller"
	"github.com/firkhraag/yukari/internal/repository"
	"github.com/firkhraag/yukari/internal/router"
	"github.com/firkhraag/yukari/internal/service"

	_ "github.com/lib/pq"
)

var (
	port = os.Getenv("PORT")
	r    = router.NewMuxRouter()
)

func main() {

	log.Println("Starting the program")
	log.Println(os.Getenv("POSTGRES_PASSWORD"))

	// Default port is :8080
	if port == "" {
		port = "8080"
	}

	// Development
	databaseURL := "host=localhost user=postgres password=password dbname=yukari sslmode=disable"

	// Production
	// databaseURL := fmt.Sprintf("user=%s password=%s host=%s dbname=%s sslmode=disable",
	// 	"postgres",
	// 	os.Getenv("POSTGRES_PASSWORD"),
	// 	"localhost",
	// 	"yukari",
	// )

	db, err := sql.Open("postgres", databaseURL)
	if err != nil {
		log.Fatal("Failed to connect to db")
		return
	}
	defer db.Close()
	if err := db.Ping(); err != nil {
		log.Fatal("Failed to ping db")
		return
	}

	sendgridService := service.NewSendgridService()

	userRepository := repository.NewPgUserRepository(db)
	userService := service.NewUserService(userRepository, sendgridService)
	userController := controller.NewUserController(userService)

	questionService := service.NewQuestionService(sendgridService)
	questionController := controller.NewQuestionController(questionService)

	sendService := service.NewSendService(sendgridService, userService)
	sendController := controller.NewSendController(sendService)

	// CORS
	// r.CORS([]string{
	// 	fmt.Sprintf("http://localhost:%s", port),
	// })
	// r.CORS([]string{
	// 	"*",
	// })

	// r.USE(CORS)

	// Client endpoints and static files

	// Development
	r.STATIC("../public", []string{
		"/policy",
	})

	// Production and development
	r.STATIC2("../dist")
	r.POST("/api/send", sendController.SendMail)

	// Server endpoints
	r.GET(
		"/api/test/hello-world",
		func(w http.ResponseWriter, r *http.Request) {
			// w.Header().Set("Access-Control-Allow-Origin", "*")
			fmt.Fprintf(w, "Hello, traveller!")
		},
	)

	r.GET(
		"/api/users/fa63ee1067bdbc0-4121-43b2-b7c5-742c2dbbd0dd830f33c7-9cbd-4fc8-bae1-2cc46a378dcc20b0834f-3c76-41e1-a133-f50fd382621ce6307038",
		userController.GetAll,
	)

	r.GET("/api/users/{id:[0-9]+}/unsubscribe/{key}", userController.Unsubscribe)

	r.POST("/api/add", userController.Add)
	r.POST("/api/ask", questionController.AskQuestion)

	log.Println("Starting the server")

	// Start the server
	r.SERVE(port, 120, 120, 120)
}

// CORS Middleware
func CORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// Set headers
		w.Header().Set("Access-Control-Allow-Headers:", "*")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "*")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Next
		next.ServeHTTP(w, r)
		return
	})
}
