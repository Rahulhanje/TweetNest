import jwt from "jsonwebtoken";


export const generateTokenAndSetCookie = (userId, res) => {
     const token=jwt.sign({_id:userId},process.env.JWT_SECRET,{
        expiresIn: '1d'
     });
     res.cookie("jwt",token,{
        maxAge:12*24*60*60*1000,
        httpOnly:true,
        sameSite:"Strict",
        secure:process.env.NODE_ENV !== 'development'
     });
}