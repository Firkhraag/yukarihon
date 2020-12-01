package controller

import "net/http"

// UserController interface
type UserController interface {
	GetAll(w http.ResponseWriter, r *http.Request)
	Add(w http.ResponseWriter, r *http.Request)
	Unsubscribe(w http.ResponseWriter, r *http.Request)
}

// SendController interface
type SendController interface {
	SendMail(w http.ResponseWriter, r *http.Request)
}

// QuestionController interface
type QuestionController interface {
	AskQuestion(w http.ResponseWriter, r *http.Request)
}
