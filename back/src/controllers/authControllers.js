const { Users } = require("../db");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config");
const login = async ( req, res ) => {
    try {
        const validationErrors = validationResult(req);
        if ( validationErrors.isEmpty() ){
            const { UserName } = req.body;
            const userToLogin = await Users.findOne({ where:{ UserName } });

            const user = { userToLogin: userToLogin.Id}
            
            const createToken = (user) => {
                return jwt.sign(user, JWT_SECRET, {
                expiresIn: "7d",
                });
            };
            const token = createToken(user);
            res.status(200).header("authorization", token).json({
                "msg": "logueo exitoso",
                token: token
            });
        } else {
            res.status(400).json({
                msg: "No se pudo ingresar porque no cumple las validaciones",
                data: validationErrors,
            });
        };      
    } catch (error) {
        console.log(error);
        res.status(500).json({ "msg":"Error al loguearse"})
    };
};

module.exports = {login};