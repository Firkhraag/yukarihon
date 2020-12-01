package service

import "github.com/firkhraag/yukari/internal/model"

// UserService interface
type UserService interface {
	GetAll() ([]*model.User, error)
	Add(user *model.User) (*model.User, error)
	Unsubscribe(id int, key string) error
}

// QuestionService interface
type QuestionService interface {
	AskQuestion(question *model.Question) error
}

// SendService interface
type SendService interface {
	SendMail(mail *model.Mail) error
}

// MailService interface
type MailService interface {
	SendEmailHTML(
		fromName string,
		fromAddr string,
		toName string,
		toAddr string,
		subject string,
		text string,
	) error

	SendEmailPlain(
		fromName string,
		fromAddr string,
		toName string,
		toAddr string,
		subject string,
		text string,
	) error
}
