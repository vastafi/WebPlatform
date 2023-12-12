import Image from "../models/image.model.js";

const ImageController = function() {

}

ImageController.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    const image = new Image({
        mission_id: req.body.mission_id,
        image_link: req.body.image_link,
        image_file: req.body.image_file,
        topic: req.body.topic,
        coordinates: req.body.coordinates,
        date: req.body.date
    });

    Image.create(image, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error in creating."
            });
        }
        else res.send(data);
    });
};

ImageController.findOne = (req, res) => {
    Image.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found image with id ${req.params.id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving image with id " + req.params.id
                });
            }
        }
        else res.send(data);
    });
};

ImageController.getByTopic = (req, res) => {
    Image.findByTopic(req.body.topic, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found images with topic ${req.body.topic}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving images with topic " + req.body.topic
                });
            }
        }
        else res.send(data);
    });
};

ImageController.getByMissionId = (req, res) => {
    Image.findByMissionId(req.body.mission_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found image with mission_id ${req.body.mission_id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving image with mission_id " + req.body.mission_id
                });
            }
        }
        else res.send(data);
    });
};

ImageController.findAll = (req, res) => {
    Image.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving images."
            });
        }
        else res.send(data);
    });
};

ImageController.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    console.log(req.body);
    Image.updateById(
        req.body.image_id,
        new Image(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found image with id ${req.body.image_id}.`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error retrieving image with id " + req.body.image_id
                    });
                }
            }
            else res.send(data);
        }
    );
};

ImageController.delete = (req, res) => {
    Image.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found image with id ${req.params.id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving image with id " + req.params.id
                });
            }
        }
        else res.send({message: `Image was deleted successfully.`});
    });
};

ImageController.deleteAll = (req, res) => {
    Image.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all images."
            });
        }
        else res.send({message: `All images were deleted successfully.`});
    });
};

export default ImageController;