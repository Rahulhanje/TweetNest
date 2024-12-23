import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const protectRoute = async (req, res, next) => {
   try{
       const token=req.cookies.jwt;
       if(!token){
           res.status(401).json({message:"Please login"});
       }
       const decoded=jwt.verify(token,process.env.JWT_SECRET);
       if(!decoded){
           res.status(401).json({message:"Invalid token"});
       }
       const user=await User.findById(decoded._id).select("-password");
       if(!user){
           res.status(401).json({message:"Not user found"});
       }
       req.user=user;
       next();

   }catch(err){
       res.status(400).json({message:err.message});
   }
}