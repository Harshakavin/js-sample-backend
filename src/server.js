"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// #!/usr/bin/env node
const bodyParser = require("body-parser");
const cor = require("cors");
var http = require('http');
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
// import * as morgan from 'morgan';
const path = require("path");
const config_1 = require("./config/config");
dotenv.config();
const routes_1 = require("./routes/routes");
const Logger_1 = require("./util/Logger");
require('mongoose').Promise = global.Promise;
const logger = Logger_1.Logger.getInstance();
const Config = new config_1.default();
const app = express();
exports.app = app;
app.set("port", (process.env.AB_PORT || 5000));
app.use("/", express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: "10mb",
    parameterLimit: 50000,
}));
app.use(cor());
const mongodbURI = process.env.AB_MONGODB_NEW_URI;
// if (process.env.AB_NODE_ENV === "test") {
// 	// mongodbURI = Config.MONGODB_TEST_URI;
// 	mongodbURI = Config.MONGODB_URI;
// } else {
// 	mongodbURI = Config.MONGODB_URI;
// 	// app.use(morgan("dev"));
// }
const mongodb = mongoose.connect(mongodbURI.toString(), { promiseLibrary: global.Promise });
mongodb.then(() => {
    logger.info("Connected to MongoDB on connected");
     routes_1.default(app);
    // app.get('/*', function(req, res) {
    //     res.sendFile(path.join(__dirname, '../public/index.html'));
    // });
    if (!module.parent) {
        app.listen((app.get("port")), () => {
            logger.info("Listening on port " + app.get("port"));
        });
    }
})
.catch((err) => {
    logger.error(err);
});
module.exports.app = app;