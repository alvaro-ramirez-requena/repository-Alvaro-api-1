import Usuario from "../models/Usuario.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const registrarUsuario = async (req, res, next) => {

    try {
        const usuario = await Usuario.create(req.body)
        usuario.password = await bcrypt.hash(req.body.password, 12)
        await usuario.save()
        res.json({ mensaje: "Usuario creado correctamente" })
    } catch (error) {
        res.send(error)
        next(error)
    }
}

const autenticarUsuario = async (req, res) => {
    const { email, password } = req.body
    const usuario = await Usuario.findOne({ email })

    if (usuario) {
        if (!bcrypt.compareSync(password, usuario.password)) {
            await res.status(401).json({ mensaje: 'Password Incorrecto' })
        } else {
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                id: usuario.id
            },
                'KEYSECRET',
                {
                    expiresIn: '2h'
                })

            res.json({ token })
        }
    } else {
        await res.status(401).json({ mensaje: 'Ese usuario no existe' })
    }
}

export {
    registrarUsuario,
    autenticarUsuario
}