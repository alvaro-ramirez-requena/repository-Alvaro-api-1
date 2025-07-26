import { DataTypes } from "sequelize";
import db from "../configuration/db.js";

const Cliente = db.define('clientes', {
    nombre: {
        type: DataTypes.STRING,
        set(value) {
            this.setDataValue('nombre', value.trim());
        }
    },
    apellido: {
        type: DataTypes.STRING,
        set(value) {
            this.setDataValue('apellido', value.trim());
        }
    },
    empresa: {
        type: DataTypes.STRING,
        set(value){
            this.setDataValue('empresa', value.trim())
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        set(value) {
            this.setDataValue('email', value.trim().toLowerCase()); 
        }
    },
    telefono: {
        type: DataTypes.STRING,
        set(value){
            this.setDataValue('telefono', value.trim())
        }
    }

})

export default Cliente

