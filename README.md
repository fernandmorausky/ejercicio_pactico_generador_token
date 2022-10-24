# Generador de Token y Consulta de Tarjeta

El proyecto cuenta con dos API:
* La primera para enviar los datos de su tarjeta y le devolvera un token el cual tiene una vigencia de 15 minutos de expiración.
* La segunda para consultar los datos de su tarjeta enviandole el token previamente generado.

## Instalación

Usar [NPM](https://www.npmjs.com/) para instalar las dependencias.

```bash
npm install
```

Usar [docker](https://www.docker.com/products/docker-desktop/) para levantar la imagen de [redis](https://redis.io/).

```bash
docker-compose up
```
## Pasos para levantar el proyecto

Para compilar el proyecto, ejecutar.

```bash
npm run compilar
```

Para correr los test unitarios, ejecutar.

```bash
npm run test
```

Para levantar el proyecto en local, ejecutar.

```bash
npm run dev
```

Para desplegar el proyecto en aws, ejecutar.

```bash
sls deploy
```




## Ejemplo de Ejecucion

### API de generar Token:
>
> Endpoint: http://localhost:3000/dev/tokens
>
> Method: POST
>
> Body:
```bash
{
    "email": "sassasasss@gmail.com",
    "card_number":"4551708270813127",
    "cvv":"111",
    "expiration_year":"2027",
    "expiration_month":"10"
}
```

> Headers:
```bash
comercio:pk_test_LsRBKejsCOEEWOsw
```

>
### API de Consulta Tarjeta:
>
> Endpoint: http://localhost:3000/dev/tarjeta
>
> Method: GET
>
> Headers:
```bash
token:q8AOlzacXSh2y1Am
comercio:pk_test_LsRBKejsCOEEWOswc
```
