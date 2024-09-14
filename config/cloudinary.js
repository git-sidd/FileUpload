import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
})

const cloudinaryConnect=()=>{
    try {
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET
        })
    } catch (error) {
        console.error(error)
        console.log("Error while Cloudinary Setup")
    }
}   
export default cloudinaryConnect;