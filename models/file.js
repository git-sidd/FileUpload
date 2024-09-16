import mongoose from "mongoose";
import  dotenv from "dotenv";
dotenv.config({
    path:"./.env"
})
import { transporter } from "../config/nodemailer.js";
const fileSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    fileUrl:{
        type:String
    },
    tags:{
        type:String,
    },
    email:{
        type:String
    }
},{timestamps:true})

fileSchema.post("save",async function (doc) {
    //doc here basically is entry in db
    try {
        console.log(doc)
        const info= transporter.sendMail({
            from: "Siddhesh Patole", // sender address
            to: doc.email, // list of receivers
            subject: "File Uploading ", // Subject line
            text: "hii this is siddhesh", // plain text body
            html: `<h1>Hello Jee </h1><p>view the file here:<a href="${doc.fileUrl}">${doc.fileUrl  }</a></p>`,
        })
        

    } catch (error) {
        console.log(error)
    }
})
 
export const File=mongoose.model("File",fileSchema)