import { Request, Response } from 'express';
import { Collection, ObjectID, MongoClient } from 'mongodb';
import { postCollection } from '../models/Post'; // Adjust the path

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postCollection.find({}).toArray();
    res.json(posts);
  } catch (error) {
    console.error('Error retrieving blog posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPostsById = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const post = await postCollection.findOne({ _id: new ObjectID(postId) });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const category = { title: post.title, content: post.content, category_id: post.category_id };
    res.json(category);
  } catch (error) {
    console.error('Error retrieving blog post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, category_id } = req.body;

    if (!title || !content || !category_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const post = {
      title,
      content,
      created_at: new Date(),
      updated_at: new Date(),
      category_id
    };

    const result = await postCollection.insertOne(post);

    res.json(result.ops[0]);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await postCollection.updateOne(
      { _id: new ObjectID(postId) },
      { $set: { title, content, updated_at: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const result = await postCollection.deleteOne({ _id: new ObjectID(postId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getLatestPosts = async (req: Request, res: Response) => {
  try {
    const pipeline = [
      {
        $sort: { created_at: -1 }
      },
      {
        $group: {
          _id: "$category_id",
          post: { $first: "$$ROOT" }
        }
      },
      {
        $replaceRoot: { newRoot: "$post" }
      }
    ];

    const latestPosts = await postCollection.aggregate(pipeline).toArray();

    res.json(latestPosts);
  } catch (error) {
    console.error('Error retrieving latest blog posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
