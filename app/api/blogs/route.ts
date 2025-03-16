// app/api/blogs/route.ts
import { NextResponse } from 'next/server';
import { getBlogPosts, createBlogPost } from '@/services/blogService';
import { checkAdminPassword } from '@/lib/auth';

// GET /api/blogs
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const onlyPublished = searchParams.get('published') !== 'false';
    
    const posts = await getBlogPosts(onlyPublished);
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
    const { password, ...postData } = await request.json();
    
    // Check if password is correct
    if (!checkAdminPassword(password)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
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

