const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

require(".node-api/routes/map/index.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});