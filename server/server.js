require('dotenv').config();
const express = require("express");
const app = express();
const router = require('./Routers/Auth-router')
const connectDB = require("./Utils/db");
const errorMiddleware = require('./Middlewares/error-middleware');
const cors = require("cors");

const corsOptions ={
    origin:"http://localhost:5173",
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials:true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/Auth-router", router)
app.use(errorMiddleware);

// Connect to MongoDB Database
connectDB().then(()=> {
    const PORT = 5555;
    app.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`);
   });
});

