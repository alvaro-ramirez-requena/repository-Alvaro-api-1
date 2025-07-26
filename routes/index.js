import express from 'express'
import { nuevoCliente,mostrarClientes,mostrarCliente,actualizarCliente,eliminarCliente } from '../controllers/clienteController.js'
import { nuevoProducto,subirArchivo, mostrarProductos,mostrarProducto, actualizarProducto, eliminarProducto } from '../controllers/productoController.js'
import { nuevoPedido, obtenerPedidos,mostrarPedido, actualizarPedido,eliminarPedido } from '../controllers/pedidoController.js'

const router = express.Router()

//Agrega nuevos clientes via POST
router.post('/clientes', nuevoCliente)

//Obtener todos los clientes
router.get('/clientes', mostrarClientes)

//Muestra un cliente en especifico (id)
router.get('/clientes/:id',  mostrarCliente )

//Actualizar un cliente por su id
router.put('/clientes/:id', actualizarCliente)

//Eliminar un cliente por su id
router.delete('/clientes/:id', eliminarCliente)

/* Productos */

//Agrega nuevos productos
router.post('/productos', 
    subirArchivo,
    nuevoProducto)

//Mostrar todos los productos
router.get('/productos', mostrarProductos)

//Mostrar un producto por id
router.get('/productos/:id', mostrarProducto)

//Actualizar producto por su id
router.put('/productos/:id',subirArchivo,actualizarProducto)

//Eliminar producto por su id
router.delete('/productos/:id',eliminarProducto)

/* Pedidos */


//Agregar pedidos
router.post('/pedidos', nuevoPedido)

//Obtener pedidos
router.get('/pedidos', obtenerPedidos)

//Mostrar pedido por Id
router.get('/pedidos/:id', mostrarPedido)

//Actualizar el pedido por Id
router.put('/pedidos/:id', actualizarPedido)

//Eliminar un pedido por su id
router.delete('/pedidos/:id', eliminarPedido)





export default router
