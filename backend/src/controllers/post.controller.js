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

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json({
            message: "Posts fetched successfully",
            posts
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const updatePost = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "At least one field is required to update"
            })
        }
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!post) {
            return res.status(404).json({
                message: "Post does not exist"
            })
        }
        return res.status(200).json({
            message: "Post updated successfully",
            post
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })

    }
}

const deletePost = async (req, res) => {
    try {
        const deleted = await Post.findByIdAndDelete(req.params.id, {isDeleted: true}, {new: true});
        if (!deleted) {
            return res.status(404).json({
                message: "no such Post exists"
            })
        }
        return res.status(200).json({
            message: "Post deleted successfully",
            post: deleted
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export {createPost, getPosts, updatePost, deletePost};