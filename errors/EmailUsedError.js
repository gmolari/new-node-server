class EmailUsedError extends Error {
    status

    constructor(message){
        super(message)
        this.name = "EmailUsedError"
        this.status = 409
    }
}

export default EmailUsedError