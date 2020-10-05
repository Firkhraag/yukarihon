package controller

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/firkhraag/yukari/internal/custom_error"
	"github.com/firkhraag/yukari/internal/model"
	"github.com/firkhraag/yukari/internal/service"
)

type userController struct {
	service service.UserService
}

// NewUserController creates a new instance of UserController
func NewUserController(service service.UserService) UserController {
	return &userController{service}
}

func (c *userController) GetAll(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	users, err := c.service.GetAll()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(custom_error.ErrorMessage{Message: "Couldn't get users"})
		log.Println("HTTP POST /api/add responded 500")
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)
	log.Println("HTTP POST /api/add responded 200")
}

func (c *userController) Add(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	u := &model.User{}
	if err := json.NewDecoder(r.Body).Decode(u); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(custom_error.ErrorMessage{Message: "Couldn't decode the body"})
		log.Println("HTTP POST /api/add responded 400")
		return
	}
	u, err := c.service.Add(u)
	if err != nil {
		if err == custom_error.ErrInvalidUser {
			w.WriteHeader(http.StatusBadRequest)
			log.Println("HTTP POST /api/add responded 400")
		} else if err == custom_error.ErrUserExists {
			w.WriteHeader(http.StatusConflict)
			log.Println("HTTP POST /api/add responded 409")
		} else {
			w.WriteHeader(http.StatusInternalServerError)
			log.Println("HTTP POST /api/add responded 500")
		}
		json.NewEncoder(w).Encode(custom_error.ErrorMessage{Message: "Couldn't register a new user"})
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(u)
	log.Println("HTTP POST /api/add responded 200")
}
