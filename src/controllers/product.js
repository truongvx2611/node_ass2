import Product from "../models/product";
import { productSchema } from "../Schemas/product";
import Category from "../models/category"

export const getAll = async (req, res) => {
    try {
        const data = await Product.find()
        if (data.length == 0) {
            return res.json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json(data);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }   
};

export const get = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Product.findById(id).populate("categoryId","-__v")
        if (data.length === 0) {
            return res.status(200).json({
                message: "Không có sản phẩm",
            });  
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const create = async (req, res) => {
    try {
        const body = req.body;
        const {error}= productSchema.validate(body);
        if(error){
            return res.json({
                message :error.details[0].message,
            })
        }
        const data = await Product.create(body)

        await Category.findByIdAndUpdate(data.categoryId,{
            $addToSet:{
                products: data._id
            }
        })
        
        if (data.length === 0) {
            return res.status(400).json({
                message: "Thêm sản phẩm thất bại",
            });
        }
        return res.status(200).json({
            message: "Thêm sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const remove = async (req, res) => {
    try {
        const data = await Product.findByIdAndDelete(req.params.id)
        return res.json({
            message: "Xóa sản phẩm thành công",
            data
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const update = async (req, res) => {
    try {
        const {error}= productSchema.validate(body);
        if(error){
            return res.json({
                message: error.details[0].message,
            })
        }
        
        if (!data) {
            return res.status(400).json({
                message: "Cập nhật sản phẩm thất bại",
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
