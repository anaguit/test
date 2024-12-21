const { Router } = require("express");
const router = Router();
const { login } = require("../controllers/authControllers");

const validationLoginUser = require("../middleware/validationLogin");

router.post("/login", validationLoginUser, login );

module.exports = router;