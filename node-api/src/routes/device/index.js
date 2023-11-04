import express from "express";
const router = express.Router();
import devices from "../../controllers/device.controller.js";

router.post("/api/devices", devices.create);
router.get("/api/devices/:id", devices.findOne);
router.get("/api/devices", devices.findAll);
router.put("/api/devices", devices.update);
router.delete("/api/devices/:id", devices.delete);
router.delete("/api/devices", devices.deleteAll);

export default router;