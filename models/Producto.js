import { DataTypes } from "sequelize";
import db from "../configuration/db.js";

const Producto = db.define('productos', {
    nombre: {
        type: DataTypes.STRING,
        set(value) {
            this.setDataValue('nombre', value.trim());
        }
    },
    precio: {
        type: DataTypes.INTEGER

    },
    imagen: {
        type: DataTypes.STRING
    },
    imagen_id: {
        type: DataTypes.STRING,
    }

})

export default Producto