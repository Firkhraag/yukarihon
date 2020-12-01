package service

import (
	"github.com/firkhraag/yukari/internal/custom_error"
	"github.com/firkhraag/yukari/internal/model"
	"github.com/firkhraag/yukari/internal/repository"
)

type userService struct {
	repository  repository.UserRepository
	mailService MailService
}

// NewUserService creates a new instance of UserService
func NewUserService(userRepository repository.UserRepository, mailService MailService) UserService {
	return &userService{userRepository, mailService}
}

func (s *userService) GetAll() ([]*model.User, error) {
	return s.repository.GetAll()
}

func (s *userService) Add(user *model.User) (*model.User, error) {
	if user == nil {
		return nil, custom_error.ErrInvalidUser
	}
	if err := user.Validate(); err != nil {
		return nil, custom_error.ErrInvalidUser
	}
	if foundUser, _ := s.repository.GetByEmail(user.Email); foundUser != nil {
		return nil, custom_error.ErrUserExists
	}
	if err := s.repository.Add(user); err != nil {
		return nil, err
	}
	s.mailService.SendEmailPlain(
		"Лекторий Юкари",
		"yukari.lectorium@gmail.com",
		user.Username,
		user.Email,
		"Регистрация",
		"Регистрация прошла успешно!\n\nС уважением,\nКоманда Юкари",
	)
	return user, nil
}

func (s *userService) Unsubscribe(id int, key string) error {
	return s.repository.Unsubscribe(id, key)
}
