require('dotenv').config();
const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME , 
  api_key: process.env.API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET  
});
console.log(process.env.API_KEY)

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) throw new Error("Local file path is missing.");

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        console.log("Uploaded to Cloudinary:", response.secure_url);

        // Remove the file after upload
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error.message);
        // Safely handle unlink operation
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null; // Indicate failure
    }
};

module.exports = { uploadOnCloudinary };
