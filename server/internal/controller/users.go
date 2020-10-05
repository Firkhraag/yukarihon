package controller

import (
	"encoding/json"
	"net/http"

	"github.com/firkhraag/yukari/internal/error"
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
		json.NewEncoder(w).Encode(error.ErrorMessage{Message: "Couldn't encode the body"})
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)
}

func (c *userController) Add(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	u := &model.User{}
	if err := json.NewDecoder(r.Body).Decode(u); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(error.ErrorMessage{Message: "Couldn't decode the body"})
		return
	}
	u, err := c.service.Add(u)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(error.ErrorMessage{Message: "Couldn't encode the body"})
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(u)
}
