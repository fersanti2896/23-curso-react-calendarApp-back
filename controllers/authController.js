
const { response } = require('express');

const crearUsuario = (req, res = response) => {
    const { name, email, password } = req.body;
    
    res.status(201).json({
        ok: true, 
        msg: 'Registro',
        name,
        email, password
    });
}

const loginUsuario = (req, res = response) => {
    const { email, password } = req.body;

    res.status(201).json({
        ok: true, 
        msg: 'Login',
        email,
        password
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