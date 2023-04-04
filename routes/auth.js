const { Router } = require('express');
const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/authController');
const router = Router();

/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

router.post('/new', crearUsuario);

router.post('/', loginUsuario);

router.get('/renew', renovarToken);

module.exports = router;