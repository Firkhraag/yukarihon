package model

import "github.com/go-playground/validator/v10"

// Question model
type Question struct {
	ID   int    `json:"id"`
	Text string `json:"text" validate:"min=4,max=5000"`
	User User   `json:"user"`
}

// Validate question fields
func (q *Question) Validate() error {
	if err := q.User.Validate(); err != nil {
		return err
	}
	v := validator.New()
	return v.Struct(q)
}
