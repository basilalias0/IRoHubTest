const express = require("express")
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const userRouter = require("./routes/userRoutes")


const connectDb =async ()=>{
    try {
        await mongoose.connect("mongodb+srv://Basil:90sOFh7dC2PGPnfq@cluster.rce3u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster")
        console.log("Db Connected");
        
    } catch (error) {
        console.log(error);
    }
}

connectDb()

app.use(express.json());
app.use(cookieParser())
app.use('/api/v1/user',userRouter)



app.listen(5000,()=>{
    console.log("App is running");
})