class FieldDoesntExist extends Error {
    status

    constructor(message){
        super(message)
        this.name = "FieldDoesntExist"
        this.status = 400
    }
}

export default FieldDoesntExist