package service

import (
	"github.com/firkhraag/yukari/internal/custom_error"
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
		return custom_error.ErrInvalidUser
	}
	if err := question.Validate(); err != nil {
		return custom_error.ErrInvalidUser
	}
	return mailService.SendEmail(
		"Yukari",
		"yukari.lectorium@gmail.com",
		question.User.Username,
		question.User.Email,
		"Вопрос",
		question.Question,
	)
}
