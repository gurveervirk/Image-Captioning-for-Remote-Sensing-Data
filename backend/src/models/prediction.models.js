import mongoose from 'mongoose'
const predictionSchema = new mongoose.Schema({
    image:{
        type:String, // cloudinary video url
        required:true,
    },
    caption:{
        type:String,
        required:true
    },
},{timestamps:true})

export const Prediction = mongoose.model("Prediction",predictionSchema);