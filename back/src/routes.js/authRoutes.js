const { Router } = require("express");
const router = Router();
const { login } = require("../controllers/authControllers");

router.post("/login", login );

module.exports = router;