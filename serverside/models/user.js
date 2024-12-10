import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String },  
    email: { type: String },
    pass: { type: String },
    address:{type:String},
    phone:{type:Number},
    district:{type:String},
    city:{type:String},
    pincode:{type:Number}

});





export default mongoose.model.user||mongoose.model('user',userSchema)