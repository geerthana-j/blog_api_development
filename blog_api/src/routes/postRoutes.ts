import express from 'express';
import { 
  getPosts, 
  getPostsById, 
  createPost, 
  updatePost, 
  deletePost, 
  getLatestPosts 
} from '../controllers/postController';

const router = express.Router();

// GET all blog posts
router.get('/posts', getPosts);

router.get('/posts/latest', getLatestPosts);
 
// GET a specific blog post by ID
router.get('/posts/:id', getPostsById);

// Create a new blog post
router.post('/posts', createPost);

// Update an existing blog post by ID
router.put('/posts/:id', updatePost);

// Delete a blog post by ID
router.delete('/posts/:id', deletePost);

// Retrieve the latest blog post from each unique category

export default router;
