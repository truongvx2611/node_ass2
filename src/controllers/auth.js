import User from "../models/auth";
import bcrybt from "bcryptjs";
import { signinSchema, signupSchema } from "../Schemas/auth";
import Jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validate sign up
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    //hiện ra tất cả các lỗi
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    //check email đẫ tồn tại hay chưa
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "email đẫ tồn tại",
      });
    }
    //mã hóa password
    const hashedPassword = await bcrybt.hash(password, 10);
    //tạo tài khoản
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    //không cho password hiện ra
    user.password = undefined;
    //trả về thông báo
    return res.status(200).json({
      message: "đăng ký thành công",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signinSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        messages: errors,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "tai khoan khong ton tai",
      });
    }
    console.log(1);
    const isMatch = bcrybt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "khong dung mat khau",
      });
    }
    const token = Jwt.sign({ id: user._id }, "duong", { expiresIn: "1d" });
    return res.status(200).json({
      message: "dang nhap thanh cong",
      accesstoken: token,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
