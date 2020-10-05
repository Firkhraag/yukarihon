package service

type sendgridSevice struct{}

// NewSendgridSevice creates a new instance of MailService
func NewSendgridSevice() MailService {
	return &sendgridSevice{}
}

// SendEmail sends an email with given information
func (s *sendgridSevice) SendEmail(
	fromName string,
	fromAddr string,
	toName string,
	toAddr string,
	subject string,
	text string,
) error {
	return nil

	// from := mail.NewEmail(fromName, fromAddr)
	// to := mail.NewEmail(toName, toAddr)
	// content := mail.NewContent("text/plain", text)

	// // message := mail.NewSingleEmail(from, subject, to, text, fmt.Sprintf("<p>%s</p>", text))
	// message := mail.NewV3MailInit(from, subject, to, content)

	// client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	// _, err := client.Send(message)
	// return err
}
