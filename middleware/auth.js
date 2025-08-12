import jwt from 'jsonwebtoken'

const security =(req,res) => {
    const authHeader = req.get('Authorization')

    if(!authHeader){
        const error = new Error('No autenticado, no hay JWT')
        error.statusCode = 401
        throw error
    }
}

export default security