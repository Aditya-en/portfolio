// app/api/blogs/route.ts
import { NextResponse } from 'next/server';
import { getBlogPosts, createBlogPost } from '@/services/blogService';
import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from "next-auth/next";


// GET /api/blogs
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const onlyPublished = searchParams.get('published') !== 'false';
    console.log("fetching posts from db")
    const posts = await getBlogPosts(onlyPublished);
    if (posts) console.log("posts are not empty")
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST /api/blogs
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { ...postData } = await request.json();
    console.log({postData})
    
    const id = await createBlogPost(postData);
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

