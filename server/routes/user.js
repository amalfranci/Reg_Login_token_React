import express, { json } from "express";
import bcryt from "bcrypt";
const router = express.Router();
import { User } from "../models/User.js";
import jwt from 'jsonwebtoken'


router.post("/signup", async (req, res) => {
  console.log(req.body)
  const { username, email, password } = req.body;
  console.log(email,username)

  const user = await User.findOne({ email })

  if (user) {
    return res.json({message:"user already existed"})
  }
  const hashpassword = await bcryt.hash(password, 10)
  
  const newUser = new User({
    username,
    email,
    password: hashpassword,
    
  })

  await newUser.save()
  return res.json({status:true,message:"user created successfully"})
});



router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    return json({message:"user not exists"})
  }
  const validPassword = await bcryt.compare(password, user.password)
  if (!validPassword) {
    return res.json({message:"passwaord incorrect"})
  }
  const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' })
  res.cookie('token',token,{httpOnly:true,maxAge:360000})
  return res.json({status:true,message:"login successfully"})


})


const verifyUser = async (req, res, next) => {
  try {
    
  
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" })
    }
    const decoded= await jwt.verify(token,proces.env.KEY)
    next()
  }
  catch (err) {
    return res.json(err)
    

  }
  
}


export { router as UserRouter };
