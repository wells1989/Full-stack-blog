import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if(!token){
            return res.status(401).json({error: "unauthorized"})
        }
        const verifyToken = jwt.verify(token, process.env.SECRET)
        if(!verifyToken){
            return res.status(401).json({error: "unauthorized"})
        }

        const auth = await User.findById(verifyToken.id)
        // auth = the user assigned to the token, and below attaches it to the req.auth property

        req.userId = verifyToken.id
        req.auth = auth
        next()

    } catch (error) {
        console.log(error.message);
        res.status(401).json({error: "unauthorized"})
    }
}

/* const oldverifyToken = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({msg: "missing json web token"});
    }
  
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) return res.status(403).json({msg: "invalid token"})
      req.user = user;
      
      next();
    });
  }; */

export default verifyToken;