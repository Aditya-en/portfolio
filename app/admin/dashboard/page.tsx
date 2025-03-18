// app/admin/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/types/blog';
import GradientText from '@/components/gradient-text';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Edit, Trash2, Plus, Eye } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogTrigger 
  } from '@/components/ui/alert-dialog';
  
  export default function AdminDashboard() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [slug, setSlug] = useState<string | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const router = useRouter();
  
    useEffect(() => {

      const fetchPosts = async () => {
        try {
          const response = await fetch('/api/blogs?published=false');
    
          if (response.ok) {
            const data = await response.json();
            setPosts(data);
          } else if (response.status === 401) {
            console.log("Unauthorized access. Redirecting to login.");
            router.push('/admin');
          } else {
            console.error('Failed to fetch blog posts');
          }
        } catch (error) {
          console.error('Error fetching blog posts:', error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchPosts();
    }, [router]);
    
  
    const handleDelete = async () => {
      if (!slug) return;

      try {
        const response = await fetch(`/api/blogs/${slug}`, {
          method: 'DELETE'
        });
  
        if (response.ok) {
          setPosts(posts.filter(post => post.slug !== slug));
          setDeleteDialogOpen(false);
        } else if (response.status === 401) {
          console.log("redirecting to /admin from dashboard a")
          router.push('/admin');
        } else {
          console.error('Failed to delete blog post');
        }
      } catch (error) {
        console.error('Error deleting blog post:', error);
      }
    };
  
    const handleTogglePublish = async (post: BlogPost) => {
      const adminPassword = localStorage.getItem('adminPassword');
      if (!adminPassword) {
        console.log("redirecting to /admin from dashboard")
        router.push('/admin');
        return;
      }
  
      try {
        const response = await fetch(`/api/blogs/${post.slug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            published: !post.published
          })
        });
  
        if (response.ok) {
          // Update the post in the state
          setPosts(posts.map(p => 
            p.id === post.id ? { ...p, published: !p.published } : p
          ));
        } else if (response.status === 401) {
          // Unauthorized, redirect to login
          console.log("redirecting to /admin from dashboard")
          router.push('/admin');
        } else {
          console.error('Failed to update blog post');
        }
      } catch (error) {
        console.error('Error updating blog post:', error);
      }
    };
  
    const handleLogout = () => {
      localStorage.removeItem('adminPassword');
      console.log("redirecting to /admin from dashboard")
      router.push('/admin');
    };
  
    if (loading) {
      return (
        <div className="container mx-auto px-4 py-8 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      );
    }
  
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            <GradientText>Admin Dashboard</GradientText>
          </h1>
          <div className="flex space-x-4">
            <Button asChild variant="default">
              <Link href="/admin/edit">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Link>
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
  
        {posts.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <p className="text-xl mb-4">No blog posts yet</p>
              <Button asChild>
                <Link href="/admin/edit">
                  <Plus className="w-4 h-4 mr-2" />
                  Create your first blog post
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className={`${!post.published ? 'border-dashed' : ''}`}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <CardDescription className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.createdAt).toLocaleDateString()}
                      {!post.published && (
                        <Badge variant="outline" className="ml-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                          Draft
                        </Badge>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm">Published</span>
                      <Switch 
                        checked={post.published} 
                        onCheckedChange={() => handleTogglePublish(post)}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/blogs/${post.slug}`}>
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/edit/${post.slug}`}>
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => {
                      setSlug(post.slug);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
  
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the blog post.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={ handleDelete} className="bg-red-500 hover:bg-red-600">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }