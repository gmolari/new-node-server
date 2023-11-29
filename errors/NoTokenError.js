class NoTokenError extends Error {
    status

    constructor(message){
        super(message)
        this.name = "NoTokenError"
        this.status = 403
    }
}

export default NoTokenError