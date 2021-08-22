# Tramos Horarios
Tramos horarios es una aplicación que muestra la comunicación en tiempo real entre usuarios mediante mensajes STOMP.
Autenticate para seleccionar los horarios de interés que van desde las 8 a las 20 hrs en intervalos de 30 minutos, cada horario cuenta con una disponiblidad máxima de 8 reservaciones.

Esta es la parte frontend que consume datos desde una API que puedes consultar [aquí](https://github.com/AlejandroCN/tramos-horarios-backend "aquí").
## Comenzando 🚀
La aplicación usa Google Sing In como uno de los métodos de autenticación, por lo que deberás crear una aplicación de Google Sign In y registrar tu Client Id en el archivo src/environments/google.environment.ts, dentro de tal archivo agrega la siguiente configuración:
```
export const googleSignIn = {
  googleClientId: 'tu-client-id-aqui'
}
```
En el archivo src/environmets/environment.ts coloca la el endpoint base de la api en ambiente de desarrollo como se muestra aquí:
```
export const environment = {
  production: false,
  apiUrl: 'http://baseUrl.ejemplo:8080',
  ...googleSignIn,
};
```
### Pre-requisitos 📋

* [Node JS](https://nodejs.org/en/)
* [Angular CLI](https://cli.angular.io)
### Instalación 🔧
En la raíz del proyecto:
```
ng serve -o
```
Para levantar la aplicación en la dirección por defecto: http://localhost:4200
## Despliegue 📦
Agrega la url del servidor en producción al archivo src/environments/environment.prod.ts
En la raíz del proyecto ejecuta:
```
ng build --prod
```
Los archivos estáticos para desplegar a tu servidor se generarán en el directorio dist/tramos-horarios/

## Construido con 🛠️

* [Angular 11](https://cli.angular.io) - El framework web usado para frontend
* [Node Package Manager](https://nodejs.org/en/) - Manejador de dependencias
