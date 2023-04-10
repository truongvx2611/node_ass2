import Joi from "joi";

export const productSchema= Joi.object({
    name : Joi.string().required().messages({
        "any.required":"bắt buộc phải nhập name"
    }),
    price : Joi.number().required().messages({
        "any.required":"bắt buộc phải nhập price"
    }),
    categoryId: Joi.string().required().messages({
        "any.required":"bắt buộc phải id danh mục"
    })
})