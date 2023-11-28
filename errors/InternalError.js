class InternalError extends Error {
    status

    constructor(message, status){
        super(message)
        this.name = "InternalError"
        this.status = status
    }
}

export default InternalError