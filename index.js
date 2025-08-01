import express from 'express'
import ss from './routes/index.js'
import db from './configuration/db.js'
import cors from 'cors'
import './models/index.js'

//Conexion a la base de datos

try{
    await db.authenticate()
    db.sync()
    console.log('conexion correcta a la base de datos')
}catch(error){
    console.log(error)
}

//Crear el servidor
const app = express()

//habilitar bodyParser  
app.use(express.urlencoded({extended:true}))

//Habilitar cors
app.use(cors({
    origin:['http://localhost:5173'],
    methods:['GET', 'PUT', 'POST', 'DELETE'],
    credentials:true
}))
app.use(express.json())

// rutas de la app
app.use('/', ss)

const port = process.env.PORT || 3001

//puerto
app.listen(port, () => {
    console.log(`el servidor esta funconado en ${port}`)
})