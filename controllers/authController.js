
const { response } = require('express');

const crearUsuario = (req, res = response) => {
    res.json({
        ok: true, 
        msg: 'Registro'
    });
}

const loginUsuario = (req, res = response) => {
    res.json({
        ok: true, 
        msg: 'Login'
    });
}

const renovarToken = (req, res = response) => {
    res.json({
        ok: true, 
        msg: 'Renew'
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    renovarToken
}