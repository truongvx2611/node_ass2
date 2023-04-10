import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type : String,
        require : true
    },
    email:{
        type : String,
        unique:true,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    role : {
        type : String,
        default : "member"
    }
})
export default mongoose.model("User",userSchema)