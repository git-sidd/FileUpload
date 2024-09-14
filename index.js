import express from "express";
import connectDB from "./config/database.js";
import cloudinaryConnect from "./config/cloudinary.js";
import router from "./routes/fileRoutes.js"
import fileUpload from "express-fileupload";

const app=express()
const PORT=process.env.PORT||3000

app.listen(PORT ,()=>{
    console.log(`Server Started at PORT :http://localhost:${PORT}`)
})

app.use(express.json());

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

//database
connectDB();
//cloudinary
cloudinaryConnect();

//roter
app.use("/api/v1/upload",router)

