package service

import "github.com/firkhraag/yukari/internal/model"

// UserService interface
type UserService interface {
	GetAll() ([]*model.User, error)
	Add(user *model.User) (*model.User, error)
}

// QuestionService interface
type QuestionService interface {
	AskQuestion(question *model.Question) error
}

// MailService interface
type MailService interface {
	SendEmail(
		fromName string,
		fromAddr string,
		toName string,
		toAddr string,
		subject string,
		text string,
	) error
}
