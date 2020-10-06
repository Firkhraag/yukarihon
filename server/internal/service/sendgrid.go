package service

import (
	"os"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

type sendgridService struct{}

// NewSendgridService creates a new instance of MailService
func NewSendgridService() MailService {
	return &sendgridService{}
}

// SendEmail sends an email with given information
func (s *sendgridService) SendEmail(
	fromName string,
	fromAddr string,
	toName string,
	toAddr string,
	subject string,
	text string,
) error {
	// return nil

	from := mail.NewEmail(fromName, fromAddr)
	to := mail.NewEmail(toName, toAddr)
	content := mail.NewContent("text/plain", text)

	// message := mail.NewSingleEmail(from, subject, to, text, fmt.Sprintf("<p>%s</p>", text))
	message := mail.NewV3MailInit(from, subject, to, content)

	client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	_, err := client.Send(message)
	return err
}
