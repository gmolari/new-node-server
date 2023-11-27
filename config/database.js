import { Sequelize } from "sequelize";
import {config as dotEnv} from "dotenv"

dotEnv() 

const sequelize = new Sequelize({
    dialect: process.env.DIALECT,
    storage: './database.sqlite'
})

export default sequelize