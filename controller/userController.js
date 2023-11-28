import User from "../model/User.js"
import bcrypt from "bcrypt"
import EmailUsedError from "../exceptions/EmailUsedError.js"

async function create(req, res) {
    try {
        // valores enviados para o cadastro
        const {name, email, pass} = req.body

        // novo usuário sendo definido de qualquer forma
        let newUser = null

        // checando se alguma informação é nula ou não existe
        if (!name || !email || !pass){
            res.status(400).send({
                status: 400,
                message: "Some field doesn't exists"
            })
            return
        }

        const saltRounds = process.env.SALT
        const salt = bcrypt.genSaltSync(parseInt(saltRounds))
        const hashPass = bcrypt.hashSync(pass, salt)

        // criando o novo usuário
        try {
            newUser = await User.create({name, email, password: hashPass})
        } catch (error) {
            // houver erro e for referente a unico email
            console.log(error)
            if (error.name == "SequelizeUniqueConstraintError") {
                throw new EmailUsedError("This email has been used", 404)
            }else {
                throw new Error('Unable to create the user, a error has ocurred')
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
        console.log(error.name)
        res.status(400).send({
            status: 400,
            message: "Unable to create the user, a error has ocurred"
        })
    }
}

async function login(req, res) {
    try {
        const {email} = req.body.email

        if (!email) {
            throw Error('We need an email...')
        }

        const cUser = User.findOne({where: {email}})

        res.status(200).send(cUser)
    } catch (error) {
        
    }
}

export {
    create,
    login
}