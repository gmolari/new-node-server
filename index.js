import express from "express";

const app = express();

app.use('/', express.static('public'))

app.listen(80, () => console.log("http://localhost:80"))