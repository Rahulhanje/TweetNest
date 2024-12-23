import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { username, fullname, password, email } = req.body;
    if (!username || !fullname || !password || !email) {
      throw new Error("Please fill all the fields");
    }
    const userEmail = z.string().email();
    if (!userEmail.safeParse(email).success) {
      throw new Error("Invalid email");
    }
    const existinuser = await User.findOne({ username });
    if (existinuser) {
      throw new Error("Username already exists");
    }
    const existingemail = await User.findOne({ email });
    if (existingemail) {
      throw new Error("Email already exists");
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    if (hashedpassword) {
      const Createduser = new User({
        username,
        fullname,
        password: hashedpassword,
        email,
      });
      if (Createduser) {
        generateTokenAndSetCookie(Createduser._id, res);
        await Createduser.save();
        res.status(201).json({
          _id: Createduser._id,
          username: Createduser.username,
          fullname: Createduser.fullname,
          email: Createduser.email,
          Followers: Createduser.followers,
          Following: Createduser.following,
          profileImage: Createduser.profileImage,
          coverImage: Createduser.coverImage,
          bio: Createduser.bio,
        });
      } else {
        throw new Error("User not created");
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error("Please fill all the fields");
    }
    
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const hashedpassword = await bcrypt.compare(password, user.password);
    console.log(hashedpassword);
    console.log(user.password);
    console.log(password);
    if (!hashedpassword) {
      res.status(401).json({ message: "Invalid username or password" });
    } else {
      generateTokenAndSetCookie(user._id, res);
      res.status(200).json({
        _id: user._id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        Followers: user.followers,
        Following: user.following,
        profileImage: user.profileImage,
        coverImage: user.coverImage,
        bio: user.bio,
        link: user.link,
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const getMe=async(req,res)=>{
    try{
      const user=await User.findById(req.user._id).select("-password");
      res.status(200).json(user);
    }catch(err){
        res.status(400).json({message:`Error in GetMe controller${err.message}`});
    }
  }