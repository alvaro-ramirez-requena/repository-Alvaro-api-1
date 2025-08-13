import express from 'express'
import { nuevoCliente,mostrarClientes,mostrarCliente,actualizarCliente,eliminarCliente } from '../controllers/clienteController.js'
import { nuevoProducto,subirArchivo, mostrarProductos,mostrarProducto, actualizarProducto, eliminarProducto, buscarProducto } from '../controllers/productoController.js'
import { nuevoPedido, obtenerPedidos,mostrarPedido, actualizarPedido,eliminarPedido } from '../controllers/pedidoController.js'
import { autenticarUsuario, registrarUsuario } from '../controllers/usuarioController.js'

import security from '../middleware/auth.js'

const router = express.Router()

//Agrega nuevos clientes via POST
router.post('/clientes',security, nuevoCliente)

//Obtener todos los clientes
router.get('/clientes',security, mostrarClientes)

//Muestra un cliente en especifico (id)
router.get('/clientes/:id', security, mostrarCliente )

//Actualizar un cliente por su id
router.put('/clientes/:id',security, actualizarCliente)

//Eliminar un cliente por su id
router.delete('/clientes/:id',security, eliminarCliente)

/* Productos */

//Agrega nuevos productos
router.post('/productos', security,
    subirArchivo,
    nuevoProducto)

//Mostrar todos los productos
router.get('/productos', security,mostrarProductos)

//Mostrar un producto por id
router.get('/productos/:id',security, mostrarProducto)

//Actualizar producto por su id
router.put('/productos/:id',security,subirArchivo,actualizarProducto)

//Eliminar producto por su id
router.delete('/productos/:id',security,eliminarProducto)

//Busqueda de Productos
router.get('/productos/busqueda/:query',security,buscarProducto)

/* Pedidos */


//Agregar pedidos
router.post('/pedidos', security,nuevoPedido)

//Obtener pedidos
router.get('/pedidos', security,obtenerPedidos)

//Mostrar pedido por Id
router.get('/pedidos/:id', security,mostrarPedido)

//Actualizar el pedido por Id
router.put('/pedidos/:id', security,actualizarPedido)

//Eliminar un pedido por su id
router.delete('/pedidos/:id', security,eliminarPedido)

//Usuarios
router.post('/crear-cuenta', security,registrarUsuario)

router.post('/iniciar-sesion',autenticarUsuario)





export default router
