
const asyncHandler = require("express-async-handler")
const { Error } = require("mongoose")
const bCrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../model/userModel")
require('dotenv').config()



const userController = {
    createUser:asyncHandler(async(req,res)=>{
            const {name,email,password} = req.body
            if(!name  || !password || !email){
                throw new Error("Data Incomplete")
               }

            const userFound = await User.findOne({email})
            if(userFound){
                throw new Error("User already Registered")
            }
            const hashedPassword =await bCrypt.hash(password,10) 
            if(!hashedPassword){
                throw new Error("Hashing password failed")
            }
            const createdUser = await User.create({
                name,
                email,
                password:hashedPassword
            })
            if(!createdUser){
                throw new Error("User Creation failed")
            }

            const token = jwt.sign({name},process.env.JWT_SECRET)

            res.cookie("token",{
                name:createdUser.name,
                email:createdUser.email,
                token
            })
            res.send({
                name:createdUser.name,
                email:createdUser.email,
                token
            })

    })
}

module.exports = userController