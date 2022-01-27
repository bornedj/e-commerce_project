"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtRouter = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
exports.jwtRouter = (0, express_1.Router)();
exports.jwtRouter.get('/', (req, res) => {
    const privateKey = fs_1.default.readFileSync("./key.pem", 'utf8');
    const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 2);
    const token = jsonwebtoken_1.default.sign({ exp: expiration }, privateKey, { algorithm: 'HS256' });
    res.cookie("sessionCookie", token, {
        secure: true,
        httpOnly: true,
        expires: new Date(expiration)
    });
    res.send(token);
});
const isAuthorized = (req, res, next) => {
    if (typeof req.headers.authorization !== "undefined") {
        const token = req.headers.authorization.split(" ")[1];
        const privateKey = fs_1.default.readFileSync("./key.pem", 'utf8');
        jsonwebtoken_1.default.verify(token, privateKey, { algorithms: ["HS256"] }, (err, user) => {
            if (err) {
                res.status(500).send("Not Authorized");
            }
            console.log(user);
            return next();
        });
    }
    res.status(500).send("Not Authorized");
};
//# sourceMappingURL=jwt.js.map