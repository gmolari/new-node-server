class InternalError extends Error {
    status

    constructor(message){
        super(message)
        this.name = "InternalError"
        this.status = 500
    }
}

export default InternalError