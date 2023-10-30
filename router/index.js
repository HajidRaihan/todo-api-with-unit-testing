const router = require("express").Router();
const controller = require("../controller/todosController");

router.get("/todo", controller.findAllTodos);
router.get("/todo/:id", controller.getTodoById);
router.post("/todo/add", controller.createTodo);
router.put("/todo/:id", controller.updateTodo);
router.delete("/todo/:id", controller.removeTodo);

module.exports = router;
