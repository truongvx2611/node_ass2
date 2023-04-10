import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name :{
        type : String,
        require : true
    },
    products : [
        {
        type : mongoose.Types.ObjectId,
        ref : "Product"
        }
    ]
})

export default mongoose.model("Category",categorySchema)