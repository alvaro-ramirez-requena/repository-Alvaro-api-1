import Cliente from "../models/Cliente.js";

//agrega un nuevo cliente

const nuevoCliente = async(req,res,next) => {
    try{
        const cliente = await Cliente.create(req.body)
        res.json({mensaje: 'Se agrego nuevo cliente ', cliente})
    }catch(error){
        res.send(error)
        next(error)
    }
} 

//Muestra todos los clientes
const mostrarClientes = async(req,res, next) => {
    try{
        const clientes = await Cliente.findAll()
        res.json(clientes)
    }catch(error){
        console.log(error)
        next(error)
    }
}

//Muestra un cliente por id    
const mostrarCliente = async(req,res,next) => {
    const {id} = req.params

    try{
        const cliente = await Cliente.findByPk(id)

        if(cliente){
            res.json({mensaje: 'Este cliente se encontro', cliente})
            return
        }
        res.json({mensaje:'No se encontro'})
    }catch(error){
        console.log(error)
        next(error)
    }
}


//Actualizar un cliente por su id
const actualizarCliente = async(req,res,next)=>{
    const {id} = req.params
    try{
        const cliente = await Cliente.findByPk(id)
        if(cliente){
            cliente.set(req.body)
            await cliente.save()
            res.json({mensaje: 'cliente actualizado', cliente})
            return
        }
        res.json({mensaje:'No se encontro el cliente'})
    }catch(error){
        console.log(error)
        next(error)
    }

}

const eliminarCliente = async(req,res,next) => {
    const {id} = req.params

    try{
        const cliente = await Cliente.findByPk(id)
        if(cliente){
            await cliente.destroy()
            res.json({mensaje:'Cliente eliminado'})
            return
        }
        res.json({mensaje:'No se encontro el cliente'})
    }catch(error){
        console.log(error)
        next(error)
    }
}

export {
    nuevoCliente,
    mostrarClientes,
    mostrarCliente,
    actualizarCliente,
    eliminarCliente
}