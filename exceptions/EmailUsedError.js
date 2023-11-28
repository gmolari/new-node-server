class EmailUsedError extends Error {
    status

    constructor(message, status){
        super(message)
        this.name = "EmailUsedError"
        this.status = status
    }
}

export default EmailUsedError