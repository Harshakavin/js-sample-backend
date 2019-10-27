"use strict";
// #!/usr/bin/env node
import * as bodyParser from "body-parser";
import * as cor from "cors";
import * as dotenv from "dotenv";
import * as express from "express";
import * as mongoose from "mongoose";
import * as path from "path";
dotenv.config();
import setRoutes from "./routes/routes";
import {Logger} from "./util/Logger";
require("mongoose").Promise = global.Promise;

const logger = Logger.getInstance();
const app = express();
app.set("port", (Number(process.env.AB_PORT) || 3000));
app.use("/", express.static(path.join(__dirname, "../public")));
app.use( bodyParser.json({limit: "50mb"}) );
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
		setRoutes(app);
		if (!module.parent) {
			const port = Number(process.env.PORT) || 3000;
			app.listen( port, "0.0.0.0", () => {
				logger.info("Listening on port " + app.get("port"));
			});
		}
	})
	.catch((err: any) => {
		logger.error(err);
	});

export default { app };
module.exports = app.listen(3000);


