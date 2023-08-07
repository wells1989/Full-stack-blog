import express from "express";
import Blog from "../models/BlogSchema.js";
import verifyToken from "../middleware/auth.js";

const BlogRouter = express.Router();
BlogRouter.use(express.json());

// get all posts
BlogRouter.get("/", verifyToken, async (req, res) => {
    try {
        await Blog.find().sort("-createdOn").populate("user")
        .then(result => {
            res.status(200).json(result)
        })
    }
    catch(error) {
        console.log(error)
        res.status(400).send(error)
    }
});

// get individual blog
BlogRouter.get("/:id", verifyToken, async (req, res) => {
    try {
        const foundBlog = await Blog.findById(req.params.id);
        res.status(200).json(foundBlog)

    } catch (error) {
        res.status(400).json({error: error})
    }
});

// create new post
BlogRouter.post("/create", verifyToken, async (req, res) => {
    try {
        const { title, content, image } = req.body
        if (title && content) {
            const blog = new Blog({
                title, content, image, user: req.userId
            })
            await blog.save()
            res.status(200).json({ msg: "blog created", blog: blog })
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

//delete blog

BlogRouter.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete({user: req.userId, _id: req.params.id})
        if (!blog) {
            return res.status(404).send("blog not found")
        }
        res.status(200).json({msg: "blog deleted"});
    } catch (error) {
        res.status(400).send(error)
    }
})

// update route
BlogRouter.put("/update/:id", verifyToken, async (req, res) => {
    try{
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { $set: req.body }, { new:true });
        res.status(200).json(updatedBlog)
    }catch(error){
        res.status(500).json(error);
    }
})

export default BlogRouter; 


