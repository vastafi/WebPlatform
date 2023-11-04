import Device from "../models/device.model.js";

const DeviceController = function() {

}

DeviceController.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    const device = new Device({
        name: req.body.name,
        num: req.body.num
    });

    Device.create(device, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error in creating."
            });
        }
        else res.send(data);
    });
};

DeviceController.findOne = (req, res) => {
    Device.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found device with id ${req.params.id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving device with id " + req.params.id
                });
            }
        }
        else res.send(data);
    });
};

DeviceController.findAll = (req, res) => {
    const name = req.query.name;

    Device.getAll(name, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving devices."
            });
        }
        else res.send(data);
    });
};

DeviceController.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    console.log(req.body);
    Device.updateById(
        req.params.id,
        new Device(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found device with id ${req.params.id}.`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error retrieving device with id " + req.params.id
                    });
                }
            }
            else res.send(data);
        }
    );
};

DeviceController.delete = (req, res) => {
    Device.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found device with id ${req.params.id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving device with id " + req.params.id
                });
            }
        }
        else res.send({message: `Device was deleted successfully.`});
    });
};

DeviceController.deleteAll = (req, res) => {
    Device.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all devices."
            });
        }
        else res.send({message: `All devices were deleted successfully.`});
    });
};

export default DeviceController;