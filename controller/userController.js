import User from "../model/User.js"
import bcrypt from "bcrypt"
import EmailUsedError from "../errors/EmailUsedError.js"
import FieldDoesntExist from "../errors/FieldDoesntExist.js"
import InternalError from "../errors/InternalError.js"
import DataNotFindedError from "../errors/DataNotFindedError.js"
import InvalidDataError from "../errors/InvalidDataError.js"
import { createToken } from "../config/jwt.js"

async function create(req, res) {
    try {
        // valores enviados para o cadastro
        const {name, email, pass} = req.body

        let newUser = null

        // checando se alguma informação é nula ou não existe
        if (!name || !email || !pass){
            throw new FieldDoesntExist("Some field doesn't exist", 400)
        }

        // criptografando senha
        const saltRounds = process.env.SALT
        const salt = bcrypt.genSaltSync(parseInt(saltRounds))
        const hashPass = bcrypt.hashSync(pass, salt)

        // criando o novo usuário
        try {
            newUser = await User.create({name, email, password: hashPass})
        } catch (error) {
            // houver erro e for referente a unico email
            if (error.name == "SequelizeUniqueConstraintError") {
                throw new EmailUsedError("This email has been used")
            }else {
                throw new InternalError('Unable to create the user, a error has ocurred')
            }
        }

        // tudo deu certo
        const response = {
            status: 200,
            message: "User has been created",
            user: newUser
        }
        res.status(200).send(response)

    } catch (error) {
        // qualquer outro erro não tratado
        res.status(error.status || 400).send({
            status: error.status || 400,
            message: error.message
        })
    }
}

async function login(req, res) {
    try {
        const {email, pass} = req.body

        if (!email || !pass) {
            throw new FieldDoesntExist("Some field doesn't exist")
        }

        let cUser = null

        cUser = await User.findOne({where: {email: email}})

        if (!cUser) throw new DataNotFindedError("Cannot find user by this email")

        const checkPass = bcrypt.compareSync(pass, cUser.password)

        if (!checkPass) throw new InvalidDataError("Email or password don't match")

        const token = createToken({id: cUser.id})

        res.redirect(301, `/home.html?id=${token}`)
    } catch (error) {
        res.status(error.status || 400).send({
            status: error.status || 400,
            message: error.message
        })
    }
}

async function get(req, res) {
    try {
        const id = res.locals.thisUser

        if (!id) throw new FieldDoesntExist("Don't have way to find the user")

        let cUser = null

        cUser = await User.findByPk(id)

        if (!cUser) throw new DataNotFindedError("Can't find any user by this data")

        res.status(200).send({id: cUser.id, name: cUser.name})
    } catch (error) {
        res.status(error.status || 400).send({
            status: error.status || 400,
            message: error.message
        })
    }
}

export {
    create,
    login,
    get
}