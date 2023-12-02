class NoTokenError extends Error {
    status

    constructor(message){
        super(message)
        this.name = "NoTokenError"
        this.status = 401
    }
}

export default NoTokenError