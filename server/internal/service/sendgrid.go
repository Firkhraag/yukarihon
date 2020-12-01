package service

import (
	"log"
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
func (s *sendgridService) SendEmailHTML(
	fromName string,
	fromAddr string,
	toName string,
	toAddr string,
	subject string,
	text string,
) error {
	// return nil

	// from := mail.NewEmail(fromName, fromAddr)
	// to := mail.NewEmail(toName, toAddr)

	// message := mail.NewSingleEmail(from, subject, to, textPlain, text)

	// client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	// response, err := client.Send(message)
	// log.Println("Sendgrid info:")
	// log.Println(response.StatusCode)
	// log.Println(response.Body)
	// log.Println(response.Headers)
	// return err

	from := mail.NewEmail(fromName, fromAddr)
	to := mail.NewEmail(toName, toAddr)
	content := mail.NewContent("text/html", text)

	message := mail.NewV3MailInit(from, subject, to, content)

	// dat, err := ioutil.ReadFile("program.png")
	// if err == nil {
	// 	return err
	// }
	// encoded := base64.StdEncoding.EncodeToString([]byte(dat))
	// log.Println(encoded[0])

	// a := mail.NewAttachment()
	// a.SetContent(encoded)
	// a.SetType("image/png")
	// a.SetFilename("Yukari.png")
	// a.SetDisposition("attachment")
	// message.AddAttachment(a)

	// // Send the email
	// request := sendgrid.GetRequest(
	// 	os.Getenv("SENDGRID_API_KEY"),
	// 	"/v3/mail/send",
	// 	"https://api.sendgrid.com",
	// )
	// request.Method = "POST"
	// request.Body = mail.GetRequestBody(message)
	// response, err := sendgrid.API(request)
	// if err != nil {
	// 	log.Println(err)
	// 	return err
	// }
	// log.Println(response.StatusCode)
	// log.Println(response.Body)
	// log.Println(response.Headers)
	// return nil

	client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	response, err := client.Send(message)
	log.Println("Sendgrid info:")
	log.Println(response.StatusCode)
	log.Println(response.Body)
	log.Println(response.Headers)
	return err
}

func (s *sendgridService) SendEmailPlain(
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
	response, err := client.Send(message)
	log.Println("Sendgrid info:")
	log.Println(response.StatusCode)
	log.Println(response.Body)
	log.Println(response.Headers)
	return err
}
