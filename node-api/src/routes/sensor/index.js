import express from "express";
const router = express.Router();
import sensors from "../../controllers/sensor.controller.js";

router.post("/api/sensors", sensors.create);
router.get("/api/sensors/:id", sensors.findOne);
router.get("/api/sensors", sensors.findAll);
router.put("/api/sensors", sensors.update);
router.delete("/api/sensors/:id", sensors.delete);
router.delete("/api/sensors", sensors.deleteAll);

export default router;