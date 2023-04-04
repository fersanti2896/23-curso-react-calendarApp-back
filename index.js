
/* Configurando Express */
const express = require('express');
require('dotenv').config();

console.log(process.env)

/* Creando el servidor de Express */
const app = express();

/* Directorio público */
app.use( express.static('public') );

/* Rutas */

/* Escuchando las peticiones */
app.listen( process.env.PORT, () => {
    console.log(`Servidor en puerto ${ process.env.PORT }`);
} )