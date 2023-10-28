/*
module.exports = mapRoutes => {
    const maps = require("../controllers/map.controller.js");
    var router = require("express").Router();

    router.post("/", maps.create);
    router.get("/:id", maps.findOne);
    router.get("/", maps.findAll);
    router.put("/", maps.update);
    router.delete("/:id", maps.delete);
    router.delete("/", maps.delelteAll);
};
*/

const maps = require("../controllers/map.controller.js");
var router = require("express").Router();

router.post("/", maps.create);
router.get("/:id", maps.findOne);
router.get("/", maps.findAll);
router.put("/", maps.update);
router.delete("/:id", maps.delete);
router.delete("/", maps.delelteAll);

export default router;