import express from "express";
import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import verifyToken from '../middleware/auth.js'

const UserRouter = express.Router();
UserRouter.use(express.json());

// get all users
UserRouter.get("/", verifyToken, async (req, res) => {
    try {
        const userList = await User.find();
        userList.populate("user")
        res.status(200).json(userList)

    } catch (error) {
        res.status(400).json({error: error})
    }
});

// get individual user by id
UserRouter.get("/:id", verifyToken, async (req, res) => {
    try {
        const foundUser = await User.find(req.params.find);
        res.status(200).json(foundUser)

    } catch (error) {
        res.status(400).json({error: error})
    }
});

// create new user
UserRouter.post("/register", async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if(name && email && password) {
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = await User.create({name, email, password: hashPassword})
            res.status(200).json({msg: "user created", user: newUser})
        }
        else {
            res.status(400).json({msg: "missing required fields"})
        }

    } catch (error) {
        res.status(400).json({error: error});
    }

}); 

// login
UserRouter.post("/login", async (req, res, next) => {
    try {
       const user = await User.findOne({email: req.body.email}) 
    if (!user) res.status(404).send("User not found")

    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if (!correctPassword) {
        res.status(400).send("incorrect password!")
    } else {
        const token = jwt.sign({
            id: user._id,
        }, process.env.SECRET);
        
        res.status(201).send({ msg: "user logged in", token: token})
    }
    } catch(err) {
        next(err)
    }
});

// get user id by email
UserRouter.get("/email", verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email}) 

        res.status(200).json(user._id)

    } catch (error) {
        res.status(400).json({error: error})
    }
});

  // auth
  UserRouter.get("/auth", verifyToken, (req, res) => {
    res.status(200).json(req.auth)
  })

export default UserRouter;

