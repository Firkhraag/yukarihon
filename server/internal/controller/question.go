package controller

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/firkhraag/yukari/internal/custom_error"
	"github.com/firkhraag/yukari/internal/model"
	"github.com/firkhraag/yukari/internal/service"
)

type questionController struct {
	service service.QuestionService
}

// NewQuestionController creates a new instance of QuestionsController
func NewQuestionController(service service.QuestionService) QuestionController {
	return &questionController{service}
}

func (c *questionController) AskQuestion(w http.ResponseWriter, r *http.Request) {
	q := &model.Question{}
	if err := json.NewDecoder(r.Body).Decode(q); err != nil {
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(custom_error.ErrorMessage{Message: "Couldn't decode the body"})
		log.Println("HTTP POST /api/ask responded 400")
		return
	}
	err := c.service.AskQuestion(q)
	// Should add bad request status code depending on error, but nah
	if err != nil {
		w.Header().Add("Content-Type", "application/json")
		if err == custom_error.ErrInvalidUser {
			w.WriteHeader(http.StatusBadRequest)
			log.Println("HTTP POST /api/ask responded 400")
		} else {
			w.WriteHeader(http.StatusInternalServerError)
			log.Println("HTTP POST /api/ask responded 500")
		}
		json.NewEncoder(w).Encode(custom_error.ErrorMessage{Message: "Failed to send an email"})
		return
	}
	w.WriteHeader(http.StatusNoContent)
	log.Println("HTTP POST /api/ask responded 204")
}
