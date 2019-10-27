"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JWT = require("jsonwebtoken");
const Logger_1 = require("../util/Logger");
const { performance } = require('perf_hooks');
const logger = new Logger_1.Logger();
function auth(options) {
    if (!options || !options.secret) {
        throw new Error("secret should be set");
    }
    const secretkey = options.secret;
    const middleware = (req, res, next) => {
        let token;
        if (req.headers && req.headers.authorization) {
            const parts = req.get("authorization").split(" ");
            if (parts.length === 2) {
                const scheme = parts[0];
                const credentials = parts[1];
                if (/^Bearer$/i.test(scheme)) {
                    token = credentials;
                }
                else {
                    logger.info("credentials_bad_scheme, Format is Authorization: Bearer [token]");
                    return res.status(401).json({ err: "credentials_bad_scheme, Format is Authorization: Bearer [token]" });
                }
            }
            else {
                logger.info("credentials_bad_scheme, Format is Authorization: Bearer [token]");
                return res.status(401).json({ err: "credentials_bad_scheme, Format is Authorization: Bearer [token]" });
            }
            if (!token) {
                logger.info("No authorization token was found");
                return res.status(401).json({ err: "No authorization token was found" });
            }
            JWT.verify(token, secretkey, (err, decodedToken) => {
                if (err || !decodedToken) {
                    logger.info("Authentication failed");
                    return res.status(401).json({ err: "Authentication failed" });
                }
                else {
                    const dToken = decodedToken;
                    req.authUser = dToken;
                    const t0 = performance.now();
                    // AWSUserFacade.getInstance().verifyAccessToken(dToken.accessToken).then( (valid:boolean)=>{
                    logger.info("Took " + (performance.now() - t0) + " milliseconds verify.");
                    // if(valid){
                    next();
                    //   }else{
                    //     return res.status(401).json({err: "Authentication failed"});
                    //   }
                    // });
                }
            });
        }
        else {
            logger.info("Authorization failed");
            return res.status(401).json({ err: "Authentication failed" });
        }
    };
    return middleware;
}
exports.auth = auth;
