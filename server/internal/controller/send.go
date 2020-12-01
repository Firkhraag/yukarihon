package controller

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/firkhraag/yukari/internal/custom_error"
	"github.com/firkhraag/yukari/internal/model"
	"github.com/firkhraag/yukari/internal/service"
)

type sendController struct {
	service service.SendService
}

// NewSendController creates a new instance of sendService
func NewSendController(service service.SendService) SendController {
	return &sendController{service}
}

func (c *sendController) SendMail(w http.ResponseWriter, r *http.Request) {
	// w.Header().Set("Access-Control-Allow-Origin", "*")
	// w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	m := &model.Mail{}
	if err := json.NewDecoder(r.Body).Decode(m); err != nil {
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(custom_error.ErrorMessage{Message: "Couldn't decode the body"})
		log.Println("HTTP POST /api/send responded 400")
		return
	}
	err := c.service.SendMail(m)
	if err != nil {
		w.Header().Add("Content-Type", "application/json")
		if err == custom_error.ErrInvalidUser {
			w.WriteHeader(http.StatusBadRequest)
			log.Println("HTTP POST /api/send responded 400")
		} else {
			w.WriteHeader(http.StatusInternalServerError)
			log.Println("HTTP POST /api/send responded 500")
		}
		json.NewEncoder(w).Encode(custom_error.ErrorMessage{Message: "Failed to send an email"})
		return
	}
	w.WriteHeader(http.StatusNoContent)
	log.Println("HTTP POST /api/send responded 204")
}
