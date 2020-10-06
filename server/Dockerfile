FROM golang AS builder
WORKDIR /app/github.com/firkhraag/yukari
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o ./dist/app ./cmd/server/main.go

FROM alpine
WORKDIR /app
COPY --from=builder /app/github.com/firkhraag/yukari/dist/app .
CMD ["./app"]
