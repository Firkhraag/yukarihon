FROM golang:alpine
WORKDIR /app/github.com/firkhraag/yukari-migration
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o ./dist/app ./cmd/migration/main.go
CMD ["./dist/app"]