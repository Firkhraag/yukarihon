package custom_error

import "errors"

// ErrorMessage struct
type ErrorMessage struct {
	Message string `json:"message"`
}

var (
	// ErrInvalidUser error
	ErrInvalidUser = errors.New("user is't valid")
	// ErrUserExists error
	ErrUserExists = errors.New("user already exists")
)
