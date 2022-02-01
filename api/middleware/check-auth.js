//Almacena el JWT en nodemon.js, que es donde se encuentra el env.JWT_KEY

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error){
        return res.status(401).json({
            message: 'No se pudo autenticar'
        });
    }
};