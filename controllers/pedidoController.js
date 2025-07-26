import Pedido from "../models/Pedido.js";
import PedidoProducto from "../models/PedidoProducto.js";
import Producto from "../models/Producto.js";
import Cliente from "../models/Cliente.js";

const nuevoPedido = async (req, res, next) => {
  try {
    const { clienteId, productos, total } = req.body;

    const pedido = await Pedido.create({
      clienteId,
      total
    });

    for (const item of productos) {
      await PedidoProducto.create({
        pedidoId: pedido.id,
        productoId: item.productoId,
        cantidad: item.cantidad
      });
    }

    res.json({ mensaje: "Pedido creado correctamente" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};


const obtenerPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedido.findAll({
      include: [
        {
          model: Cliente, // Relación con el cliente
          attributes: ['id', 'nombre', 'email'] // Puedes filtrar campos si deseas
        },
        {
          model: Producto, // Relación con productos (muchos a muchos)
          through: {
            attributes: ['cantidad'] // Campo de la tabla intermedia PedidoProducto
          }
        }
      ]
    });

    res.json(pedidos);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const mostrarPedido = async(req,res,next) => {
    try {
    const { id } = req.params

    const pedido = await Pedido.findByPk(id, {
      include: [
        {
          model: Cliente,
          attributes: ['id', 'nombre', 'email'] // Puedes ajustar los campos
        },
        {
          model: Producto,
          attributes: ['id', 'nombre', 'precio'],
          through: {
            model: PedidoProducto,
            attributes: ['cantidad']
          }
        }
      ]
    })

    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' })
    }

    res.json(pedido)
  } catch (error) {
    console.log(error)
    next(error)
  }
}


const actualizarPedido = async(req,res,next) => {
    try {
    const { id } = req.params
    const { clienteId, productos, total } = req.body

    const pedido = await Pedido.findByPk(id)

    if (!pedido) {
      return res.status(404).json({ mensaje: "Pedido no encontrado" })
    }

    // Actualiza datos del pedido
    pedido.set({ clienteId, total })
    await pedido.save()

    // Elimina productos anteriores
    await PedidoProducto.destroy({ where: { pedidoId: id } })

    // Inserta nuevos productos
    for (const item of productos) {
      await PedidoProducto.create({
        pedidoId: id,
        productoId: item.productoId,
        cantidad: item.cantidad
      })
    }

    // Traer el pedido actualizado con cliente y productos
    const pedidoActualizado = await Pedido.findByPk(id, {
      include: [
        {
          model: Cliente,
          attributes: ["id", "nombre", "email"] // ajusta según tus columnas
        },
        {
          model: Producto,
          through: {
            attributes: ["cantidad"]
          }
        }
      ]
    })

    res.json(pedidoActualizado)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const eliminarPedido = async(req,res,next) => {
    try {
    const { id } = req.params;

    // Verifica que exista el pedido
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }

    // Elimina primero los registros en la tabla intermedia
    await PedidoProducto.destroy({ where: { pedidoId: id } });

    // Luego elimina el pedido
    await pedido.destroy();

    res.json({ mensaje: "Pedido eliminado correctamente" });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export { 
    nuevoPedido,
    obtenerPedidos,
    mostrarPedido,
    actualizarPedido,
    eliminarPedido
};