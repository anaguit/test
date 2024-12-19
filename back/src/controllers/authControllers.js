const { Users } = require("../db");
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config");
const login = async ( req, res ) => {
    try {
        const { UserName } = req.body
        const userToLogin = await Users.findOne({ where:{ UserName } })
        
        if( !userToLogin ){
            return res.status(404).json({ "msg": "El usuario no existe"});
        }
        const user = { userToLogin: userToLogin.id}
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
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ "msg":"Error al loguearse"})
    };
};

module.exports = {login};