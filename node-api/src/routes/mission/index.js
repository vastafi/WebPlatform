import express from "express";
const router = express.Router();
import missions from "../../controllers/mission.controller.js";

router.post("/api/missions", missions.create);
router.get("/api/missions/:id", missions.findOne);
router.get("/api/missions", missions.findAll);
router.put("/api/missions", missions.update);
router.delete("/api/missions/:id", missions.delete);
router.delete("/api/missions", missions.deleteAll);

export default router;