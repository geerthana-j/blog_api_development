import express from 'express';
import { 
  getPosts, 
  getPostsById, 
  createPosts, 
  updatePosts, 
  deletePosts, 
  getLatestPosts 
} from '../controllers/postController';

const router = express.Router();

// GET all blog posts
router.get('/api/posts', getPosts);

// GET a specific blog post by ID
router.get('/api/posts/:id', getPostsById);

// Create a new blog post
router.post('/api/posts', createPost);

// Update an existing blog post by ID
router.put('/api/posts/:id', updatePost);

// Delete a blog post by ID
router.delete('/api/posts/:id', deletePost);

// Retrieve the latest blog post from each unique category
router.get('/api/posts/latest', getLatestPosts);

export default router;
