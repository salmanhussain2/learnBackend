import mongoose, {Schema} from "mongoose";

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    }
}, {timestamps: true});

export const Post = mongoose.model("Post", postSchema);