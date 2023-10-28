import { Request, Response } from 'express';
import { Collection, ObjectId, MongoClient } from 'mongodb';
import {createCollection,IPost,closeDB} from '../models/Post';
async function getPostCollection(): Promise<Collection<IPost> | null> {
  const postCollection = await createCollection();
  return postCollection;
}


export const getPosts = async (req: Request, res: Response) => {
  
  try {
    const postCollection = await getPostCollection();
    if (!postCollection) {
      throw new Error('postCollection is null');
    }
    const posts = await postCollection.find({}).toArray();
    res.json(posts);
  } catch (error) {
    console.error('Error retrieving blog posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  finally{
    await closeDB()
   }
 
};

export const getPostsById = async (req: Request, res: Response) => {
  try {
    const postCollection = await getPostCollection();
    if (!postCollection) {
      throw new Error('postCollection is null');
    }
    const postId = req.params.id;

    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }
    const post = await postCollection.findOne({ _id: new ObjectId(postId) });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const category = { title: post.title, content: post.content, category_id: post.category_id };
    res.json(category);
  } catch (error) {
    console.error('Error retrieving blog post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  finally{
    await closeDB()
   }
};

export const createPost = async (req: Request, res: Response) => {
  try{
    const postCollection = await getPostCollection();
    if (!postCollection) {
      throw new Error('postCollection is null');
    }
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
     await postCollection.insertOne(post);

    res.json({message:"Post created successfully"});
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  finally{
    await closeDB()
   }
};

export const updatePost = async (req: Request, res: Response) => {
  try{
    const postCollection = await getPostCollection();
    if (!postCollection) {
      throw new Error('postCollection is null');
    }
    const postId = req.params.id;
    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await postCollection.updateOne(
      { _id: new ObjectId(postId) },
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
  finally{
    await closeDB()
   }
};

export const deletePost = async (req: Request, res: Response) => {
  try{
   const postCollection = await getPostCollection();
    if (!postCollection) {
      throw new Error('postCollection is null');
    }
    const postId = req.params.id;
    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }

    const result = await postCollection.deleteOne({ _id: new ObjectId(postId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  finally{
    await closeDB()
   }
};

export const getLatestPosts = async (req: Request, res: Response) => {
  try{
  const postCollection = await getPostCollection();
    if (!postCollection) {
      throw new Error('postCollection is null');
    }
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
  finally{
    await closeDB()
  }
};
