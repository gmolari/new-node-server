import User from "../model/User.js"

async function create(req, res) {
    try {
        const {name, email, pass} = req.body
        let newUser = null

        if (!name || !email || !pass){
            res.status(400).send({
                status: 400,
                message: "Some field doesn't exists"
            })
            return
        }

        try {
            newUser = await User.create({name, email, password: pass})
        } catch (error) {
            res.status(404).send({
                status: 400,
                message: "This email has been used"
            })
            return
        }

        const response = {
            status: 200,
            message: "User has been created",
            user: newUser
        }
        res.status(200).send(response)
    } catch (error) {
        
    }
}

export {
    create
}