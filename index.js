import express from "express";
import { config } from 'dotenv';
import userRouter from "./routes/userRoutes.js";
import sequelize from "./config/database.js";

config()

const PORT = process.env.PORT 
const app = express();

app.use(express.json())
app.use('/', express.static('view'))
app.use('/api/user', userRouter)

// Syncing database
sequelize.sync().then(() => console.log("[SERVER] DATABASE SYNCED"))
.catch(err => console.log('[SERVER] UNABLE TO SYNC DATABASE:',err))

app.listen(PORT, () => {
    console.log("[SERVER] Ruuning on: http://localhost:80")
})