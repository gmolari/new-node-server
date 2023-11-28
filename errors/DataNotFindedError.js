class DataNotFinded extends Error {
    status

    constructor(message, status){
        super(message)
        this.name = "DataNotFinded"
        this.status = status
    }
}

export default DataNotFinded