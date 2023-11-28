class FieldDoesntExist extends Error {
    status

    constructor(message, status){
        super(message)
        this.name = "FieldDoesntExist"
        this.status = status
    }
}

export default FieldDoesntExist