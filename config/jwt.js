import jwt from "jsonwebtoken";
import NoTokenError from "../errors/NoTokenError.js";
import { config } from "dotenv";
import InvalidTokenError from "../errors/InvalidTokenError.js";

config()

function verifyToken(req, res, next) {
    try {
        const {token} = req.headers.authorization

        if (!token) throw new NoTokenError("Can't find token", 403)

        jwt.verify(token, process.env.HASH, (err, data) => {
            if (err) throw new InvalidTokenError("Permission denied")
            else {
                next()
            }
        })
    } catch (error) {
        res.status(error.status || 500).send({
            status: error.status || 500,
            message: error.message || "Token error"
        })
    }
}

function createToken(data) {
    return jwt.sign(data, process.env.HASH)
}

export {
    verifyToken, createToken
}