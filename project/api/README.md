# API Inkin

## Instalação
### Docker
`docker-compose up --build`

### Banco de dados
```
docker exec -it api /bin/sh
adonis migration:run
```

Para a inicialização dos dados:
`adonis seed --files='DatabaseSeeder.js'` ou `adonis seed --files='UserSeeder.js, StateSeeder.js'`...

