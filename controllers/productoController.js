import Producto from "../models/Producto.js";
import multer from "multer";
import cloudinary from "../configuration/cloudinary.js";
import streamifier from 'streamifier'
import { Op } from "sequelize";

//Configuracion del almacenamiento
const storage = multer.memoryStorage()  

const upload = multer({storage, 
    fileFilter(req,file,cb){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true)
        }else{
            cb(new Error('Formato no valido'))
        }
    }

}).single('imagen')

//Subir a Cloudinary
const subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            return res.json({ mensaje: error })
        }
        next()
    })
}


//Funcion auxiliar para subir a Cloudinary
const subirACloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {folder:'productos'},
            (error, result) => {
                if(result){
                    resolve(result)
                }else{
                    reject(error)
                }
            }
        )
        streamifier.createReadStream(file.buffer).pipe(stream)
    })
}


//Agrega nuevos productos
const nuevoProducto = async (req, res, next) => {

    try {
        const producto = await Producto.create(req.body)
        if (req.file) {
            const resultado = await subirACloudinary(req.file)
            producto.imagen = resultado.secure_url
            producto.imagen_id = resultado.public_id
            await producto.save()
        }
        res.json({ mensaje: 'Se agrego nuevo producto ', producto })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const mostrarProductos = async (req, res, next) => {

    try {
        const productos = await Producto.findAll()
        if (productos) {
            res.json(productos)
            return
        }

    } catch (error) {
        console.log(error)
        next(error)
    }
}

const mostrarProducto = async (req, res, next) => {
    const { id } = req.params
    try {
        const producto = await Producto.findByPk(id)
        if (producto) {
            res.json(producto)
            return
        }
        res.json({ mensaje: 'No se encontro el producto' })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const actualizarProducto = async (req, res, next) => {

    const { id } = req.params
    const { nombre, precio } = req.body
    const producto = await Producto.findByPk(id)
    try {
        if (req.file) {
            //Borrar imagen anterior si existia
            if(producto.imagen_id){
                await cloudinary.uploader.destroy(producto.imagen_id)
            }

            //Subir una nueva imagen
            const resultado = await subirACloudinary(req.file)

            //Actualizar campos
            producto.set({
                nombre,
                precio,
                imagen: resultado.secure_url,
                imagen_id:resultado.public_id
            })
            await producto.save()
            res.json(producto)
            return
        }
        producto.set({
            nombre,
            precio
        })
        
        await producto.save()
        res.json(producto)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const eliminarProducto = async (req, res, next) => {
    const { id } = req.params
    try {
        const producto = await Producto.findByPk(id)
        if(producto){
            //Borrar imagen si existe
            if(producto.imagen_id){
                await cloudinary.uploader.destroy(producto.imagen_id)
            }

            //Borrar producto
            await producto.destroy()
            res.json({ mensaje: "cliente eliminado" })
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const buscarProducto = async(req,res,next) => {
    try{
        const {query} = req.params
        const productos = await Producto.findAll({
            where:{
                nombre:{
                    [Op.iLike]:`%${query}`
                }     
            }
        })
        res.json(productos)
    }catch(error){
        res.send(error)
    }
}





export {
    nuevoProducto,
    subirArchivo,
    mostrarProductos,
    mostrarProducto,
    actualizarProducto,
    eliminarProducto,
    buscarProducto
}