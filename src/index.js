const express = require("express");
const route = require("./routes/route.js");
const mongoose = require("mongoose");
const app = express();

app.use(express().json());

mongoose
    .connect(
        "mongodb+srv://NikithaMerampally:nikitha123@nikithascluster.hwo5ucz.mongodb.net/group15Database",

        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDb is connected"))
    .catch((err) => console.log(err));

app.use("/", route);

app.post("/test-me", function () {
    console.log("SERVER is running ok");
});

app.listen(5000, function () {
    console.log("Express app running on port" + 5000);
});
