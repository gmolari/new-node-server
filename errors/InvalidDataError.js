class InvalidDataError extends Error {
    status

    constructor(message){
        super(message)
        this.name = "InvalidDataError"
        this.status = 400
    }
}

export default InvalidDataError