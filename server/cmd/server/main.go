package main

import (
	"database/sql"
	"fmt"
	"log"
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
	// Default port is :8080
	if port == "" {
		port = ":8080"
	}

	databaseURL := "host=localhost user=postgres password=password dbname=yukari sslmode=disable"

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

	// CORS
	r.CORS([]string{
		fmt.Sprintf("http://localhost%s", port),
	})

	// Client endpoints and static files
	r.STATIC("../public", []string{
		"/policy",
	})

	// Server endpoints
	r.GET(
		"/api/users/fa63ee1067bdbc0-4121-43b2-b7c5-742c2dbbd0dd830f33c7-9cbd-4fc8-bae1-2cc46a378dcc20b0834f-3c76-41e1-a133-f50fd382621ce6307038",
		userController.GetAll,
	)
	r.POST("/api/add", userController.Add)
	r.POST("/api/ask", questionController.AskQuestion)

	// Start the server
	r.SERVE(port, 120, 120, 120)
}
