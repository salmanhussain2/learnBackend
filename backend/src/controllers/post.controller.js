import {Post} from "../models/post.model.js";
const createPost = async (req, res) => {
    try {
        const {name, content, age} = req.body;
        if (!name || !content || !age) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const post = await Post.create({name, content, age});
        return res.status(201).json({
            message: "Post created successfully",
            post
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export {createPost};