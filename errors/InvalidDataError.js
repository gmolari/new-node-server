class InvalidDataError extends Error {
    status

    constructor(message, status){
        super(message)
        this.name = "InvalidDataError"
        this.status = status
    }
}

export default InvalidDataError