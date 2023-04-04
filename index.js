
/* Configurando Express */
const express = require('express');
require('dotenv').config();

/* Creando el servidor de Express */
const app = express();

/* Directorio público */
app.use( express.static('public') );

/* Rutas */
app.use( '/api/auth', require('./routes/auth') );
// TODO: CRUD: Eventos

/* Escuchando las peticiones */
app.listen( process.env.PORT, () => {
    console.log(`Servidor en puerto ${ process.env.PORT }`);
} );