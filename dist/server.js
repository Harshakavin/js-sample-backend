"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #!/usr/bin/env node
const bodyParser = require("body-parser");
const cor = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
dotenv.config();
const routes_1 = require("./routes/routes");
const Logger_1 = require("./util/Logger");
require("mongoose").Promise = global.Promise;
const logger = Logger_1.Logger.getInstance();
const app = express();
app.set("port", (Number(process.env.AB_PORT) || 3000));
app.use("/", express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: "10mb",
    parameterLimit: 50000,
}));
app.use(cor());
const mongodbURI = process.env.AB_MONGODB_URI;
const mongodb = mongoose.connect(mongodbURI);
mongodb.then(() => {
    logger.info("Connected to MongoDB on connected");
    routes_1.default(app);
    if (!module.parent) {
        const port = Number(process.env.PORT) || 3000;
        app.listen(port, "0.0.0.0", () => {
            logger.info("Listening on port " + app.get("port"));
        });
    }
})
    .catch((err) => {
    logger.error(err);
});
exports.default = { app };
module.exports = app.listen(3000);
