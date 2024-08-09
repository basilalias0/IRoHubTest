const express = require("express")
const userController = require("../controller/userController")
const app = express()
const userRouter = express.Router()




userRouter.post('/createUser',userController.createUser)
userRouter.get('/',(req,res)=>{
    res.send("Working")
})

module.exports = userRouter