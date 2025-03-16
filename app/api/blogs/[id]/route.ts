// app/api/blogs/[id]/route.ts
import { NextResponse } from 'next/server';
import { getBlogPostBySlug, updateBlogPost, deleteBlogPost } from '@/services/blogService';
import { checkAdminPassword } from '@/lib/auth';

// GET /api/blogs/[slug]
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await getBlogPostBySlug(params.slug);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT /api/blogs/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { password, ...postData } = await request.json();
    
    // Check if password is correct
    if (!checkAdminPassword(password)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const success = await updateBlogPost(params.id, postData);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[id]
// app/api/blogs/[id]/route.ts (continued)
// DELETE /api/blogs/[id]
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const { searchParams } = new URL(request.url);
      const password = searchParams.get('password');
      
      // Check if password is correct
      if (!checkAdminPassword(password)) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
      
      const success = await deleteBlogPost(params.id);
      
      if (!success) {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      return NextResponse.json(
        { error: 'Failed to delete blog post' },
        { status: 500 }
      );
    }
  }