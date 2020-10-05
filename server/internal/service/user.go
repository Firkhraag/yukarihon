package service

import (
	"errors"

	"github.com/firkhraag/yukari/internal/model"
	"github.com/firkhraag/yukari/internal/repository"
)

type userService struct {
	repository repository.UserRepository
}

// NewUserService creates a new instance of UserService
func NewUserService(userRepository repository.UserRepository) UserService {
	return &userService{userRepository}
}

func (s *userService) GetAll() ([]*model.User, error) {
	return s.repository.GetAll()
}

func (s *userService) Add(user *model.User) (*model.User, error) {
	if user == nil {
		return nil, errors.New("Nil user")
	}
	if err := user.Validate(); err != nil {
		return nil, err
	}
	if foundUser, _ := s.repository.GetByEmail(user.Email); foundUser != nil {
		return nil, errors.New("User already exists")
	}
	if err := s.repository.Add(user); err != nil {
		return nil, err
	}
	return user, nil
}
