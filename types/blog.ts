// types/blog.ts
export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImage?: string;
    tags: string[];
    category: string;
    createdAt: Date;
    updatedAt: Date;
    published: boolean;
  }
  
  // This is a simplified version of what we'll store in MongoDB
  export interface BlogPostDTO {
    _id?: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImage?: string;
    tags: string[];
    category: string;
    createdAt: Date;
    updatedAt: Date;
    published: boolean;
  }