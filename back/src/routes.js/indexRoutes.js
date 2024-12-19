const { Router, request } = require("express");
const router = Router();

const authRoutes = require("./authRoutes");
const tasksRoutes = require("./tasksRoutes");

router.use("/api/auth", authRoutes );
router.use("/api/tasks", tasksRoutes );

module.exports = router;