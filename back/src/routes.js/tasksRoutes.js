const { Router } = require("express");
const router = Router();
const { getTasks, createTasks, updateTasks, deleteTasks } = require("../controllers/tasksControllers");
const { authorizated } = require("../middleware/authmiddleware");

router.get("/", authorizated, getTasks );
router.post("/", authorizated, createTasks );
router.patch("/:id", authorizated, updateTasks );
router.delete("/:id", authorizated, deleteTasks );

module.exports = router;