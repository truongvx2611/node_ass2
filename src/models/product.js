import mongoose from "mongoose";
import mongoosepaginate from "mongoose-paginate-v2";
const productSchema = mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    price : {
        type:Number,
        require:true
    },
    categoryId: {
        type : mongoose.Types.ObjectId,
        ref : "Category"
    }
},{timestamps:true,versionKey:false });

productSchema.plugin(mongoosepaginate)
export default mongoose.model("Product",productSchema)