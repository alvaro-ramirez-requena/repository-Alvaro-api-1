import db from "../configuration/db.js";
import { DataTypes} from "sequelize";

const Usuario = db.define('usuarios',{
    email:{
        type:DataTypes.STRING,
        unique:true,
        set(value) {
            this.setDataValue('email', value.trim().toLowerCase()); 
        }
    },
    nombre: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'Add your name'
            }
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }

    
})

export default Usuario