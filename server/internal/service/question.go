package service

import (
	"github.com/firkhraag/yukari/internal/custom_error"
	"github.com/firkhraag/yukari/internal/model"
)

type questionService struct {
	mailService MailService
}

// NewQuestionService creates a new instance of questionService
func NewQuestionService(mailService MailService) QuestionService {
	return &questionService{mailService}
}

func (s *questionService) AskQuestion(question *model.Question) error {
	if question == nil {
		return custom_error.ErrInvalidUser
	}
	if err := question.Validate(); err != nil {
		return custom_error.ErrInvalidUser
	}
	return s.mailService.SendEmailPlain(
		question.User.Username,
		question.User.Email,
		"Yukari",
		"yukari.lectorium@gmail.com",
		"Вопрос",
		question.Question,
	)
}
