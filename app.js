const express =require("express");
require("dotenv").config();
const dbConnect = require("./models/dbConnect");
const router = require("./routers/router")

//server
const app = express();
const port = process.env.port || 5000;

app.listen(port, ()=>{
    console.log(`I am listening on port ${port}`);
});

//database connection
dbConnect();


app.use(express.json()); //gelen json datalarını okuyabilmek için bu metod lazım
app.use("/api", router)// /api şeklinde gelen istekleri router.js e yönlendiriyor