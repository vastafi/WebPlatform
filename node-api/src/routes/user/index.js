import express from "express";
const router = express.Router();
import users from "../../controllers/user.controller.js";

router.post("/api/users", users.create);
router.get("/api/users/:id", users.findOne);
router.get("/api/users", users.findAll);
router.put("/api/users", users.update);
router.delete("/api/users/:id", users.delete);
router.delete("/api/users", users.deleteAll);

export default router;