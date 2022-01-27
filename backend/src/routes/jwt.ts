import { Router, NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';

export const jwtRouter = Router();

// setting up jwt endpoint
jwtRouter.get('/', (req: Request, res: Response) => {
    const privateKey = fs.readFileSync("./key.pem", 'utf8')
    // creating the token with the private key and expiration date of two hours
    const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 2)
    const token = jwt.sign({exp: expiration}, privateKey, { algorithm: 'HS256'}) 
    res.cookie("sessionCookie", token, {
        secure: true,
        httpOnly: true,
        expires: new Date(expiration)
    })
    res.send(token);
})

// setting up authorization middleware
const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.headers.authorization !== "undefined") {
        const token = req.headers.authorization.split(" ")[1];
        const privateKey = fs.readFileSync("./key.pem", 'utf8')

        jwt.verify(token, privateKey, { algorithms: ["HS256"] }, (err: any, user: any) => {
            if (err) {
                res.status(500).send("Not Authorized")
            }

            console.log(user);
            return next();
        })
    }

    res.status(500).send("Not Authorized")
}

