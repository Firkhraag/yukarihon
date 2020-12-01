package service

import (
	"fmt"
	"strings"

	"github.com/firkhraag/yukari/internal/custom_error"
	"github.com/firkhraag/yukari/internal/model"
)

type sendService struct {
	mailService MailService
	userService UserService
}

// NewSendService creates a new instance of mailService
func NewSendService(mailService MailService, userService UserService) SendService {
	return &sendService{mailService, userService}
}

func (s *sendService) SendMail(mail *model.Mail) error {
	if mail == nil {
		return custom_error.ErrInvalidUser
	}
	if mail.Text == "" {
		return custom_error.ErrInvalidUser
	}
	// Development
	// testUserID2 := 157
	// testUserID := 3
	users, userErr := s.userService.GetAll()
	if userErr != nil {
		return userErr
	}
	mailTextHTML := strings.ReplaceAll(mail.Text, "\n", "<br>")
	for _, u := range users {
		// Development
		// if u.ID != testUserID && u.ID != testUserID2 {
		// 	continue
		// }
		if !u.Subscribed {
			continue
		}

		mailText := mailTextHTML + fmt.Sprintf(
			"<br><br><a href=\"https://yukarihon.ru:5000/api/users/%d/unsubscribe/%s\">Отписаться от рассылки</a>",
			u.ID, u.Key)

		err := s.mailService.SendEmailHTML(
			"Лекторий Юкари",
			"yukari.lectorium@gmail.com",
			u.Username,
			u.Email,
			mail.Title,
			mailText,
		)
		if err != nil {
			return err
		}
	}
	return nil
}
