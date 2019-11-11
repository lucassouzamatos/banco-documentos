# API Inkin

## Instalação
### Docker
ˋˋˋ
docker-compose up --build
ˋˋˋ

### Banco de dados
ˋˋˋ
docker exec -it api /bin/sh
adonis migration:run
 ˋˋˋ
Para a inicialização dos dados:
`adonis seed --files='DatabaseSeeder.js'` ou `adonis seed --files='UserSeeder.js, StateSeeder.js'`...

