# Clima App Node.js

Esta aplicación utiliza las API de OpenWeather y Mapbox para obtener información meteorológica de una ciudad específica. A continuación, se proporciona una guía rápida para configurar y utilizar la aplicación.

## Configuración:

1. Clonar Repositorio:

 ```
 git clone https://github.com/damianr93/clima-app-nodeJs.git
 ```

 2. Instalar Dependencias:

 ```
cd clima-app-nodeJs
npm install
 ```
3. Obtener API Keys

Obtener una clave de API de OpenWeather.
Obtener una clave de API de Mapbox.

4. Configurar las Claves de API

Crear un archivo .env en el directorio raíz del proyecto.
Agregar las claves de API en el archivo .env:

 ```
OPENWEATHER_API_KEY=TuClaveDeAPIOpenWeather
MAPBOX_API_KEY=TuClaveDeAPIMapbox
 ```

 ## Uso

 1. Ejecutar la Aplicación

````
npm start
````