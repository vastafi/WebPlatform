import sql from "./db.js";

const Image = function(image) {
    this.mission_id = image.mission_id;
    this.image_link = image.image_link;
    this.image_file = image.image_file;
    this.topic = image.topic;
    this.coordinates = image.coordinates;
    this.date = image.date;
}

Image.create = (newImage, result) => {
    sql.query("INSERT INTO image SET ?", newImage, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created image: ", {image_id: res.insertId, ...newImage});
        result(null, {id: res.insertId, ...newImage});
    });
};

Image.findById = (id, result) => {
    sql.query(`SELECT * FROM image WHERE image_id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found image: ", res[0]);
            result(null, res[0]);
            return;
        }

        console.log("image not found : id ", id);
        result({kind : "not_found"}, null);
    });
};

Image.findByTopic = (topic, result) => {
    sql.query(`SELECT * FROM image WHERE topic = '${topic}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found images: ", res);
            result(null, res);
            return;
        }

        console.log("image not found with topic: ", topic);
        result({kind : "not_found"}, null);
    });
}

Image.findByMissionId = (id, result) => {
    sql.query(`SELECT * FROM image WHERE mission_id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found images: ", res);
            result(null, res);
            return;
        }

        console.log("image not found with mission_id: ", id);
        result({kind : "not_found"}, null);
    });
};

Image.getAll = (result) => {
    sql.query("SELECT * FROM image", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("images: ", res);
        result(null, res);
    });
};

Image.updateById = (id, image, result) => {
    sql.query(
        "UPDATE image SET mission_id = ?, image_link = ?, image_file = ?, topic = ?, coordinates = ?, date = ? WHERE image_id = ?",
        [image.mission_id, image.image_link, image.image_file, image.topic, image.coordinates, image.date, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({kind: "not_found"}, null);
                return;
            }

            console.log("updated image: ", {image_id: id, ...image});
            result(null, {image_id: id, ...image});
        });
};

Image.remove = (id, result) => {
    sql.query("DELETE FROM image WHERE image_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted image with id: ", id);
        result(null, res);
    });
};

Image.removeAll = result => {
    sql.query("DELETE FROM image", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(`deleted ${res.affectedRows} images`);
        result(null, res);
    });
};

export default Image;