// services/blogService.ts
import { connectToDatabase } from '@/lib/mongodb';
import { BlogPost, BlogPostDTO } from '@/types/blog';
import { ObjectId } from 'mongodb';

export const getBlogPosts = async (onlyPublished = true): Promise<BlogPost[]> => {
  const { db } = await connectToDatabase();
  const query = onlyPublished ? { published: true } : {};
  
  const posts = await db
    .collection('posts')
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();
  
  return posts.map((post: any) => ({
    id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    content: post.content,
    excerpt: post.excerpt,
    tags: post.tags,
    category: post.category,
    coverImage: post.coverImage,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
    published: post.published
  }));
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const { db } = await connectToDatabase();
  
  const post = await db
    .collection('posts')
    .findOne({ slug });
  
  if (!post) return null;
  
  return {
    id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    content: post.content,
    excerpt: post.excerpt,
    tags: post.tags,
    category: post.category,
    coverImage: post.coverImage,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
    published: post.published
  };
};

export const createBlogPost = async (post: BlogPostDTO): Promise<string> => {
  const { db } = await connectToDatabase();
  
  const result = await db
    .collection('posts')
    .insertOne({
      ...post,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  
  return result.insertedId.toString();
};

export const updateBlogPost = async (id: string, post: Partial<BlogPostDTO>): Promise<boolean> => {
  const { db } = await connectToDatabase();
  
  const result = await db
    .collection('posts')
    .updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: {
          ...post,
          updatedAt: new Date()
        }
      }
    );
  
  return result.modifiedCount > 0;
};

export const deleteBlogPost = async (id: string): Promise<boolean> => {
  const { db } = await connectToDatabase();
  
  const result = await db
    .collection('posts')
    .deleteOne({ _id: new ObjectId(id) });
  
  return result.deletedCount > 0;
};