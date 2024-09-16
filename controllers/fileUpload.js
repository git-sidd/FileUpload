import { File } from "../models/file.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';


//as __dirname is not supported in module js
// Convert `import.meta.url` to a file path
let __filename = fileURLToPath(import.meta.url);

// Extract the directory name from the file path
const __dirname = path.dirname(__filename);


export const localFileUpload=async(req,res)=>{
    try {
        const file=await req.files.file;
        

        let path= __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;

        file.mv(path,(err)=>{
            if(err){
                console.log(err)
            console.log("Error in finding path!!")
            }
        })

        res.json({
            success:true,
            message:"File Uploaded Successfully!!"
        })



    } catch (error) {
        
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Error in uploading file"
        })
        
    }
}

function isFileTypeSupported(fileType,supportedFileType){
    return supportedFileType.includes(fileType);
}

async function uploadFileToCloudinary(file,folder,resourceType = "image"){
    const options={folder,resource_type: resourceType};
    console.log("tempfilepath:",file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath,options)
}
export const imageUpload=async(req,res)=>{
    try {
    const {name,tags,email}=req.body
    console.log(name,email,tags);

    const file=req.files.imageFile
    console.log(file);

    //validation
    const supportedFileType=["jpg","jpeg","png"]
    const fileType=file.name.split('.')[1].toLowerCase();
    console.log("filetype:",fileType)
    if(!isFileTypeSupported(fileType,supportedFileType)){
        res.status(400).json({
            success:false,
            message:"File Type Not Supported!!"
        })
        console.log("filetype not supported!!")
    }
    

    console.log("uploading file to siddhesh folder")
    console.log("file:",file)
    const response=await uploadFileToCloudinary(file,"siddhesh","image");
    console.log(response)

    console.log("secureurl",response.secure_url);

    //storing in db..
    const createUser=await File.create({
        name,
        email,
        tags,
        fileUrl:response.secure_url
    })

    res.status(200).json({
        success:true,
        message:"file uploaded successfully"
    })

    } catch (error) {
        console.error(error)
        res.status(400).json({
            success:false,
            message:"error in uploading image",
            
        })
    }
    


}

export const videoUpload=async(req,res)=>{
    try {
        const {name,tags,email}=req.body
        console.log(name,email,tags);
    
        const file=req.files.videoFile
        console.log(file);

        const supportedFileType=["mp4","mov"]
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("filetype:",fileType)
        if(!isFileTypeSupported(fileType,supportedFileType)){
            res.status(400).json({
                success:false,
                message:"File Type Not Supported!!"
            })
            console.log("filetype not supported!!")
        }
    
        console.log("uploading file to siddhesh folder")
        console.log("file:",file)
        const response=await uploadFileToCloudinary(file,"siddhesh","video");
        console.log(response)
    
        //storing in db..
        const createUser=await File.create({
            name,
            email,
            tags,
            fileUrl:response.secure_url
        })
    
        res.status(200).json({
            success:true,
            message:"file uploaded successfully"
        })


    } catch (error) {
        console.error(error)
        res.status(400).json({
            success:false,
            message:"error in uploading video",
            
        })
    }
}


