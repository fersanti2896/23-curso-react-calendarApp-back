
const { response } = require('express');
const bcrypt = require('bcryptjs');
const UsuarioModel = require('../models/UsuarioModel');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async(req, res = response) => {
    const { email, password } = req.body;
    try {  
        let usuario = await UsuarioModel.findOne({ email });
        
        if( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email.'
            });
        }
        
        usuario = new UsuarioModel( req.body );

        /* Encriptando contrseña */
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        /* Generando JWT */
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true, 
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
    
}

const loginUsuario = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        let usuario = await UsuarioModel.findOne({ email });
        
        if( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email.'
            });
        }

        /* Confirmando las contraseñas */
        const validPassword = bcrypt.compareSync( password, usuario.password );
        
        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto.'
            });
        }

        /* Generando JWT */
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true, 
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
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