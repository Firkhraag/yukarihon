package service

import (
	"errors"

	"github.com/firkhraag/yukari/internal/model"
)

var (
	mailService = NewSendgridSevice()
)

type questionService struct{}

// NewQuestionService creates a new instance of QuestionController
func NewQuestionService() QuestionService {
	return &questionService{}
}

func (s *questionService) AskQuestion(question *model.Question) error {
	if question == nil {
		return errors.New("Nil question")
	}
	if err := question.Validate(); err != nil {
		return err
	}
	return mailService.SendEmail(
		"Yukari",
		"yukari.lectorium@gmail.com",
		question.User.Username,
		question.User.Email,
		"Вопрос",
		question.Text,
	)
}
