import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    productName: { type: String },  
    category: { type: String },
    description: { type: String },
    price: { type: Number },
    user_id: { type: String },
    images: { type: Array },
    username:{type:String}
    

});





export default mongoose.model.product||mongoose.model('product',productSchema)