import { MongoClient, Collection } from 'mongodb';

const mongoUri = "mongodb+srv://geerthikumar:f3rk02JZjpHfJ3z4@cluster0.3o1mx9f.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(mongoUri);

export interface IPost {
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  category_id: string;
}

export async function createCollection(): Promise<Collection<IPost> | null> {
  try {
    await client.connect();
    const db = client.db('BlogAPI');
    const postCollection: Collection<IPost> = db.collection('posts');
    // console.log(postCollection);
    return postCollection;
  } catch (error) {
    console.error('Error creating collection:', error);
    throw error; // Re-throw the error so it can be caught by the caller
  } 
}
export const closeDB=async()=>{
  await client.close();
}

// const postCollection: Promise<Collection<IPost> | null> = createCollection();
// export default postCollection;

// import { MongoClient } from 'mongodb';
// import { Collection } from 'mongodb';

// const mongoUri = "mongodb+srv://geerthikumar:f3rk02JZjpHfJ3z4@cluster0.3o1mx9f.mongodb.net/?retryWrites=true&w=majority";

// export interface IPost {
//   title: string;
//   content: string;
//   created_at: Date;
//   updated_at: Date;
//   category_id: string;
// }

// async function createCollection(): Promise<Collection<IPost> | null>{
//   const client = new MongoClient(mongoUri);
//   try {
//     await client.connect();
//     const db = client.db('BlogAPI');
//     const postCollection:Collection<IPost>= await db.createCollection('posts', {
//       validator: {
//         $jsonSchema: {
//           bsonType: 'object',
//           required: ['id', 'title', 'content', 'created_at', 'updated_at', 'category_id'],
//           properties: {
//             id: {
//               bsonType: 'int',
//               description: 'ID must be an integer',
//             },
//             title: {
//               bsonType: 'string',
//               description: 'Title must be a string',
//             },
//             content: {
//               bsonType: 'string',
//               description: 'Content must be a string',
//             },
//             created_at: {
//               bsonType: 'date',
//               description: 'Created_at must be a date',
//             },
//             updated_at: {
//               bsonType: 'date',
//               description: 'Updated_at must be a date',
//             },
//             category_id: {
//               bsonType: 'string',
//               description: 'Category_id must be a string',
//             },
//           },
//         },
//       },
//     });

//     console.log('Collection with validation created');
//     return postCollection;
//   } catch (error) {
//     console.error('Error creating collection:', error);
//     throw error; // Re-throw the error so it can be caught by the caller
//   } finally {
//     await client.close();
//   }
// }

// export default postCollection:Collection<IPost>= createCollection();