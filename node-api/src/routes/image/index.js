import express from "express";
const router = express.Router();
import image from "../../controllers/image.controller.js";

router.post("/", image.create);
router.post("/getByTopic", image.getByTopic);
router.post("/getByMissionId", image.getByMissionId);
router.get("/:id", image.findOne);
router.get("/", image.findAll);
router.put("/", image.update);
router.delete("/:id", image.delete);
router.delete("/", image.deleteAll);

export default router;