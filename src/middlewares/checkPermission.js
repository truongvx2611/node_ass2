import jwt  from "jsonwebtoken";
import User from "../models/auth"

export const checkPermission = async(req,res,next)=>{
    try {
        if(!req.headers.authorization){
            return res.status(403).json({
                message:"bạn chưa đăng nhập"
            })
        }

        const token = req.headers.authorization.split(" ")[1];
        
        const {id} = jwt.verify(token,"duong")

        const user  = await User.findById(id)
        if(!user && user.role !== "admin"){
            return res.status(403).json({
                message : "bạn ko co quyen"
            })
        }
        next();
    } catch (error) {
        return res.status(400).json({
            message : error
        })
    }
}