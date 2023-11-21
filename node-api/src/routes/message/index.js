import express from "express";
const router = express.Router();
import messages from "../../controllers/message.controller.js";

router.post("/", messages.create);
router.get("/:id", messages.findOne);
router.get("/", messages.findAll);
router.put("/", messages.update);
router.delete("/:id", messages.delete);
router.delete("/", messages.deleteAll);

export default router;