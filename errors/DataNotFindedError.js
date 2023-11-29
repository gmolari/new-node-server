class DataNotFinded extends Error {
    status

    constructor(message){
        super(message)
        this.name = "DataNotFinded"
        this.status = 404
    }
}

export default DataNotFinded