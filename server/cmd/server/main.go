package main

import (
	"fmt"
	"os"

	"github.com/firkhraag/yukari/internal/router"
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

	// CORS
	r.CORS([]string{
		fmt.Sprintf("http://localhost%s", port),
	})

	// Frontend endpoints and static files + other routes defined inside manually
	r.STATIC("../public", []string{
		"/policy",
	})

	// Start the server
	r.SERVE(port, 120, 120, 120)
}
