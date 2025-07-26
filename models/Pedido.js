import { DataTypes } from "sequelize";
import db from "../configuration/db.js";    

const Pedido = db.define('pedidos', {

    total:{
        type:DataTypes.INTEGER
    }

})

export default Pedido