import User from "../model/User.js"
import bcrypt from "bcrypt"
import EmailUsedError from "../errors/EmailUsedError.js"
import FieldDoesntExist from "../errors/FieldDoesntExist.js"
import InternalError from "../errors/InternalError.js"
import UserNotFindError from "../errors/DataNotFindedError.js"
import InvalidDataError from "../errors/InvalidDataError.js"

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
                throw new EmailUsedError("This email has been used", 409)
            }else {
                throw new InternalError('Unable to create the user, a error has ocurred', 500)
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
            throw new FieldDoesntExist("Some field doesn't exist", 400)
        }

        let cUser = null

        try {
            cUser = await User.findOne({where: {email: email}})
        } catch (error) {
            throw error
        }

        if (!cUser) throw new UserNotFindError("Cannot find user by this email", 404)

        const checkPass = bcrypt.compareSync(pass, cUser.password)

        if (!checkPass) throw new InvalidDataError("Email or password don't match")

        res.status(200).send(cUser)
    } catch (error) {
        res.status(error.status || 400).send({
            status: error.status || 400,
            message: error.message
        })
    }
}

export {
    create,
    login
}