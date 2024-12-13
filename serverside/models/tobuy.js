import mongoose from "mongoose";
const buyerSchema = new mongoose.Schema({
    productName: { type: String },  
    description: { type: String },
    price: { type: Number },
    seller_id: { type: String },
    post_id: { type: String },
    buyer_id:{type:String},
    buyername:{type:String}
});





export default mongoose.model.messages||mongoose.model('messages',buyerSchema)