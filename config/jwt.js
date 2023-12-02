import jwt from "jsonwebtoken";
import NoTokenError from "../errors/NoTokenError.js";
import { config } from "dotenv";
import InvalidTokenError from "../errors/InvalidTokenError.js";

config()

function verifyToken(req, res, next) {
    try {
        const token = req.params.id

        if (!token) throw new NoTokenError("Can't find token")

        jwt.verify(token, process.env.HASH, (err, data) => {
            if (err) throw new InvalidTokenError("Permission denied")
            else {
                res.locals.thisUser = data.id
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