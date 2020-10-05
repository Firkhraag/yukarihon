package model

import "github.com/go-playground/validator/v10"

// User model
type User struct {
	ID       int    `json:"id"`
	Username string `json:"username" validate:"min=1,max=100"`
	Email    string `json:"email" validate:"email,min=3,max=255"`
	Date     string `json:"date"`
}

// Validate user fields
func (u *User) Validate() error {
	v := validator.New()
	return v.Struct(u)
}
