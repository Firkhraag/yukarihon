package repository

import "github.com/firkhraag/yukari/internal/model"

// UserRepository interface
type UserRepository interface {
	GetAll() ([]*model.User, error)
	GetByEmail(email string) (*model.User, error)
	Add(user *model.User) error
}
