const { body } = require("express-validator");
const { Users } = require("../db");
const bcrypt = require("bcryptjs");

const validationLogin = [
    body("UserName").notEmpty().withMessage("campo obligatorio").bail()
    .custom(async(value) => {
        const userFound = await Users.findOne({ where: { UserName:value }})
        if(!userFound){
            throw new Error("Usuario no encontrado");
        };
    }),
    body("Password").notEmpty().withMessage("campo obligatorio").bail()
    .isLength({min:5}).withMessage("La contraseña debe tener un mínimo de 5 caracteres").bail()
    .custom(async(value, { req }) => {
        const userNameValue = req.body.UserName;
        if (!userNameValue) {
            throw new Error("El campo UserName es obligatorio para validar la contraseña");
        };
        const userFound = await Users.findOne({ where: { UserName: userNameValue }})
        if(!userFound){
            throw new Error("Usuario no encontrado");
        };
        const passOk = await bcrypt.compare(value, userFound.Password);
        if (!passOk) {
            throw new Error("Los datos son incorrectos");
        };
    })
];

module.exports = validationLogin; 