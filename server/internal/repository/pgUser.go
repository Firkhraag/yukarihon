package repository

import (
	"database/sql"
	"errors"

	"github.com/firkhraag/yukari/internal/model"
)

type pgUserRepository struct {
	db *sql.DB
}

// NewPgUserRepository creates a new instance of UserRepository
func NewPgUserRepository(db *sql.DB) UserRepository {
	return &pgUserRepository{
		db: db,
	}
}

func (r *pgUserRepository) GetAll() ([]*model.User, error) {
	rows, err := r.db.Query("SELECT id, username, email, date, subscribed, key FROM users ORDER BY date DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []*model.User
	count := 0
	for rows.Next() {
		count++
		u := &model.User{}
		err := rows.Scan(&u.ID, &u.Username, &u.Email, &u.Date, &u.Subscribed, &u.Key)
		if err != nil {
			return nil, err
		}
		users = append(users, u)
	}
	if count == 0 {
		return nil, errors.New("Users were not found")
	}
	return users, nil
}

// GetByEmail finds user in database
func (r *pgUserRepository) GetByEmail(email string) (*model.User, error) {
	u := &model.User{}
	if err := r.db.QueryRow(
		"SELECT id, username, email, date, subscribed, key FROM users WHERE email = $1", email).Scan(
		&u.ID, &u.Username, &u.Email, &u.Date, &u.Subscribed, &u.Key); err != nil {
		if err == sql.ErrNoRows {
			return nil, errors.New("User not found")
		}
		return nil, err
	}
	return u, nil
}

func (r *pgUserRepository) Add(user *model.User) error {
	return r.db.QueryRow(
		"INSERT INTO users (username, email) VALUES ($1, $2) RETURNING id",
		user.Username, user.Email,
	).Scan(&user.ID)
}

func (r *pgUserRepository) Unsubscribe(id int, key string) error {
	sqlStatement := `UPDATE users SET subscribed = FALSE WHERE id = $1 AND key = $2;`
	_, err := r.db.Exec(sqlStatement, id, key)
	if err != nil {
		return err
	}
	return nil
}
