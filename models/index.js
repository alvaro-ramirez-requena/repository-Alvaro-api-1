import Cliente from './Cliente.js'
import Producto from './Producto.js'
import Pedido from './Pedido.js'
import PedidoProducto from './PedidoProducto.js'

// uno a muchos
Pedido.belongsTo(Cliente)
Cliente.hasMany(Pedido)

// muchos a muchos
Pedido.belongsToMany(Producto, { through: PedidoProducto })
Producto.belongsToMany(Pedido, { through: PedidoProducto })

export{
    Cliente,
    Producto, 
    Pedido,
    PedidoProducto
}