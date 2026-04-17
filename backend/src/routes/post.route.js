import express from 'express';
const router = express.Router();
import {createPost, getPosts, updatePost, deletePost} from '../controllers/post.controller.js';
//
router.route('/createPost').post(createPost);
router.route('/getPosts').get(getPosts);
router.route('/updatePost/:id').patch(updatePost);
router.route('/deletePost/:id').delete(deletePost);

export default router;