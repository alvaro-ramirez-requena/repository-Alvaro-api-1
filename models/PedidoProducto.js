import { DataTypes } from "sequelize";
import db from "../configuration/db.js";

const PedidoProducto = db.define('pedido_productos', {
    cantidad: {
        type:DataTypes.INTEGER,
    }
})

export default PedidoProducto