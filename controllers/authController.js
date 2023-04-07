
const { response } = require('express');
const bcrypt = require('bcryptjs');
const UsuarioModel = require('../models/UsuarioModel');


const crearUsuario = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        
        let usuario = await UsuarioModel.findOne({ email });
        
        if( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Existe el correo en un usuario.'
            });
        }
        
        usuario = new UsuarioModel( req.body );

        /* Encriptando contrseña */
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        res.status(201).json({
            ok: true, 
            uid: usuario.id,
            name: usuario.name
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
    
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