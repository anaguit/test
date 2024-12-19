const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../src/config");

const authorizated = (req,res,next)=>{
    const token = req.headers["authorization"];   

    if(token){
        jwt.verify(token,JWT_SECRET,(error, user)=>{
            if(error){
                res.status(403).json({
                    status:403,
                    msg:"El token es inválido o caducó, debe loguearse nuevamente"
                });
            } else {
                next();
            }
        });        
    }
    else {
        res.status(401).json({
            status:401,
            msg:"No tiene los permisos para ingresar, debe estar logueado"
        });
    };
};

module.exports = {authorizated}