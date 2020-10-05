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

	questionService    = service.NewQuestionService()
	questionController = controller.NewQuestionController(questionService)
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

	userRepository := repository.NewPgUserRepository(db)
	userService := service.NewUserService(userRepository)
	userController := controller.NewUserController(userService)

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
		"api/fa63ee1067bdbc0-4121-43b2-b7c5-742c2dbbd0dd830f33c7-9cbd-4fc8-bae1-2cc46a378dcc20b0834f-3c76-41e1-a133-f50fd382621ce6307038-fed6-43b-9ae4-c698843d8604e4f4ce98-9984-46fc-b3cc-5c543dfaf779cda0eb60-6355-422b-8472-2e220070d84260797e9d-e3bd-4287-8623-8b02b74e4f2312c92bcc-8c75-489f-83e4-2ea38f056ef00d7d707a-c598-4d1b-a334-56769ff0fdc8c01acbed-d60f-4222-9efd-eedf56f0b880cd92660e-1167-4ccf-8ed1-8327fcf66d0e55b30508-bce9-4d6b-a323-6fee57de1cf04ce20e02-58d5-4c04-8be4-a415addc99ca7425b50a-3ab5-45d2-b178-513683e8fa6b77b1908c-12db-4161-abeb-52074ba62195cc321030-160f-4eac-ae70-f5ac2b3b72b9a700b4c7-a7bb-45e5-8ed3-039fdf6431c78acd1974-f33f-467b-8d2e-6e996b73912c6ca0d774-71a1-46d8-b67b-9fa8dfe82d09b4dbe8ae-8ef6-4785-aa22-412b3e3555daa0db69dc-1136-44d1-8d72-8b3bda817947fc1fdf9c-57fc-42ac-bc59-1e7ebbcf8bcdfdbe006f-13e7-4824-a545-b22d6814f5ab0cc5e728-ef06-400f-816b-2a970dc6ce396d2a1485-576b-4388-b051-f2add5c39892ec975da7-d0e6-402c-8a1b-1ca51e90be955caa86fb-61c9-46c0-941d-70c885a79da93ec6022a-4a0f-4bb8-86a0-fc764be9373c0d56348f-7c39-441b-abfc-80b6f9b68fd6a63885fb-52ec-4f24-a160-c4d1fc6e72e10fb3c6ac-8881-44ee-85b0-c29b9f631566a7a981da-1f3a-4070-aec7-7e02e0dc08f3d7fc80e2-2023-41f8-be9c-a217c30095cbd8b652f8-4a6e-45-8f64-bb60679fd14ab2ea37f7-8a63-40a5-bdd6-f7d45f559c39",
		userController.GetAll,
	)
	r.POST("api/add", userController.Add)
	r.POST("api/ask", questionController.AskQuestion)

	// Start the server
	r.SERVE(port, 120, 120, 120)
}
