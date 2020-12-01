FROM golang AS builder
WORKDIR /app/github.com/firkhraag/yukari
COPY server/go.mod .
COPY server/go.sum .
RUN go mod download
COPY server/. .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o ./dist/app ./cmd/server/main.go

FROM alpine
WORKDIR /app
COPY dist/ dist/
WORKDIR /app/server
COPY --from=builder /app/github.com/firkhraag/yukari/dist/app .
# COPY server/program.png .
CMD ["./app"]
