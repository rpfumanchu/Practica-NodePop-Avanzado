# NodePop

Instala las dependencias con:

```sh
npm install
```

Copie .env.example a .env y personalice sus variables.

```sh
cp .env.example .env
```

Inicializa la base de datos con:

```sh
npm run initDB
```

Comience en modo de desarrollo:

```sh
npm run dev
```

Arranca el micro servicio

```sh
npm run micro
```

## Información general

Aplicación creada con:

```sh
npx express-generator nodepop --ejs
```

Dispone de un micro servicio con cote para hacer un thumbnail de la imagen al crear un anuncio, usando jimp para generar dicha imagen a 200x200.

# Usuario por defecto

```sh
email: user@example.com
password: 1234
```

## La api tiene disponible Swagger

Para acceder copia el siguiente enlace

http://localhost:3001/api-doc

## El proyecto cuenta con una pequeña app para calcular la hipoteca desplegada con localtunnel.

Instala las dependencias con:

```sh
npm install
```

Esta es la url generada por localtunnel.

https://robernodepop.loca.lt

## Además usa PM2 para poder lanzar todos los servicios.

### Iniciar todos los servicios con Pm2.

```sh
 pm2 start ecosystem.config.js
```

Comandos PM2:

```sh
 pm2 list
 pm2 logs
 pm2 monit
```

To stop:

```sh
 pm2 stop all
 pm2 delete all
```

## Inicie un servidor MongoDB en Macos o Linux

https://www.mongodb.com/try/download/shell

En la consola, vaya a la carpeta MongoDB y:

```sh
./bin/mongod --dbpath ./data
```

## Windows

- Descargar mongosh-1.7.1-win32-x64
  https://downloads.mongodb.com/compass/mongosh-1.7.1-win32-x64.zip
- Ejecute mongosh.exe

## API Methods

### POST /api/login

http://127.0.0.1:3001/api/login

#### Devuelve un jwt que puedes ponerlo en la cabecera, o el body o la query-string

# Usuario por defecto

```sh
email: user@example.com
password: 1234
```

###

### GET /api/catalogue

http://127.0.0.1:3001/api/catalogue

#### Método que permite filtrar por los distintos campos que contiene un anuncio. Se devuelve en formato json

- "results": [
  - {
  - "\_id": "63f9152449b6e321793fd867",
    - "name": "nike",
    - "state": true,
    - "price": 180,
    - "tags": [
      "lifestyle"
      ],
    - "img": "zapas",
    - "\_\_v": 0
  - }
- ]

#### Además tiene implementado limit, skip y fields.

http://localhost:3001/api/catalogue?fields=name&limit=4&skip=3

### GET /api/catalogue/tags

http://localhost:3001/api/catalogue/tags?tag=tags

#### Método que devuelve los distintos tag que tienen los anuncios.

### GET /api/catalogue/range/

// http://localhost:3001/api/catalogue/range/659

#### Método para buscar por rango de precio.

- -50 seria <= 50
  http://localhost:3001/api/catalogue/range/-200
- 50- seria >= 50
  http://localhost:3001/api/catalogue/range/9000-
- 50-100 seria rango de precios entre 50 y 100
  http://localhost:3001/api/catalogue/range/50-800
- 50 seria anuncio con precio exacto
  http://localhost:3001/api/catalogue/range/659

## Metodos PUT y POST se pueden comprobar mediante Postman

https://www.postman.com/downloads/

### PUT /api/catalogue/modify

```sh
localhost:3001/api/catalogue/modify/"_id del anuncio"
```

#### Método que permite modificar un anuncio mediante su \_id.

### POST /api/catalogue/create (body)

```sh
//http://localhost:3001/api/catalogue/create
```

#### Método que permite crear un anuncio

#### El Schena del anuncio esta definido de la siguiente forma.

- name: String,
- state: Boolean,
- price: Number,
- tags: Array,
- img: String

### DELETE /api/catalogue/delete

#### Método que permite borrar un anuncio por su \_id

```sh
//http://localhost:3001/api/catalogue/delete/ "_id del anuncio"
```

# Página frontend simple

## Cuenta con una página frontend simple.

http://127.1.1.0:3001/

## Con tres links:

### Nos permite gestionar filtros y búsquedas anteriormente descritas.

http://127.0.0.1:3001/filter

### Crear un anuncio.

http://127.1.1.0:3001/create

### Filtrar por distintos precios.

http://127.1.1.0:3001/range/659
