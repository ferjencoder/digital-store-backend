
# Websockets + Handlebars
### Integrar vistas y sockets a nuestro servidor actual.

---
## Consigna

Configurar nuestro proyecto para que trabaje con Handlebars y websocket.

---

## Aspectos a incluir

1. Configurar el servidor para integrar el motor de plantillas Handlebars e instalar un servidor de socket.io al mismo.
2. Crear una vista “home.handlebars” la cual contenga una lista de todos los productos agregados hasta el momento

3. Además, crear una vista **realTimeProducts.handlebars**, la cual vivirá en el endpoint **/realtimeproducts** en nuestro views router, ésta contendrá la misma lista de productos, sin embargo, ésta trabajará con websockets.
    3.1. Al trabajar con websockets, cada vez que creemos un producto nuevo, o bien cada vez que eliminemos un producto, se debe actualizar automáticamente en dicha vista la lista.

---

## Sugerencias

1. Ya que la conexión entre una consulta HTTP y websocket no está contemplada dentro de la clase. Se recomienda que, para la creación y eliminación de un producto, Se cree un formulario simple en la vista  realTimeProducts.handlebars. Para que el contenido se envíe desde websockets y no HTTP. Sin embargo, esta no es la mejor solución, leer el siguiente punto.

2. Si se desea hacer la conexión de socket emits con HTTP, deberás buscar la forma de utilizar el servidor io de Sockets dentro de la petición POST. ¿Cómo utilizarás un emit dentro del POST?

---

## Testing de Entregable

1. Se instalará y correrá el servidor en el puerto indicado.
   1. El servidor debe levantarse sin problema.
2. Se abrirá la ruta raíz.
   1. Debe visualizarse el contenido de la vista index.handlebars.
   2. No se debe activar el websocket aún.
3. Se buscará en la URL del navegador la ruta "/realtimeproducts".
   1. Se corroborará que el servidor haya conectado con el cliente. En la consola del servidor deberá mostrarse un mensaje de "cliente conectado".
   2. Se debe mostrar la lista de productos y se corroborará que se esté enviando desde websocket.


## File system

- app.js              // Entry point of the application
- routes/             // Contains route handlers
  - index.js          // Main router file
  - users.js          // Router file for user-related routes
- controllers/        // Contains controllers for route handlers
  - usersController.js   // Controller file for user-related routes
- models/             // Contains data models
  - User.js           // Model file for User
- middleware/         // Contains custom middleware functions
  - auth.js           // Authentication middleware
- config/             // Configuration files
  - database.js       // MongoDB configuration
- utils/              // Utility functions or modules
  - helpers.js        // Helper functions
- public/             // Publicly accessible files (e.g., images, stylesheets)
- tests/              // Unit tests
- .env                // Environment variables (not version controlled)
- package.json        // Project dependencies and scripts


This structure represents the organization of files and directories within the project. Here's a brief explanation of each directory and file:

- **app.js**: The main entry point of the application, where the server is initialized and middleware are set up.

- **routes**: This directory contains route handlers. You can have multiple route files based on different areas or resources in your application.

- **controllers**: Controllers handle the logic for each route handler. They interact with models, perform operations, and send responses.

- **models**: Models define the data structure and interact with the MongoDB database. Each model typically corresponds to a collection in the database.

- **middleware**: Custom middleware functions can be placed here. For example, an authentication middleware to protect certain routes.

- **config**: Configuration files, such as database configuration or environment-specific settings.

- **utils**: Utility functions or modules that are commonly used throughout the application.

- **public**: This directory can hold publicly accessible files, such as images or stylesheets.

- **tests**: Unit tests for your application's routes, controllers, and other components.

- **.env**: An environment file to store sensitive or environment-specific variables (e.g., database credentials).

- **package.json**: The file that manages project dependencies and includes scripts for running and testing the application.