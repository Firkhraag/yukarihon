package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"

	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/lib/pq"
)

func main() {
	// databaseURL := "host=localhost user=postgres password=password dbname=yukari sslmode=disable"
	databaseURL := fmt.Sprintf("user=%s password=%s host=%s dbname=%s sslmode=disable",
		"postgres",
		"password",
		"postgres",
		"yukari",
	)

	db, err := sql.Open("postgres", databaseURL)
	if err != nil {
		log.Fatalf("could not connect to the database... %v", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatalf("could not ping DB... %v", err)
	}

	// Run migrations
	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		log.Fatalf("could not start sql migration... %v", err)
	}

	m, err := migrate.NewWithDatabaseInstance("file://migrations", "postgres", driver)
	if err != nil {
		log.Fatalf("migration failed... %v", err)
	}
	defer m.Close()

	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		log.Fatalf("An error occurred while syncing the database.. %v", err)
	}

	log.Println("Database migrated")
}
