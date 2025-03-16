// app/admin/edit/[id]/page.tsx and app/admin/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BlogPost, BlogPostDTO } from '@/types/blog';
import GradientText from '@/components/gradient-text';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { slugify } from '@/lib/utils';

export default function BlogEditor() {
  const params = useParams();
  const postId = params?.id as string;
  const isEditing = !!postId;
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<BlogPostDTO>>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    tags: [],
    category: 'machine-learning',
    published: false,
  });
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [previewTab, setPreviewTab] = useState('edit');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is authenticated
    const adminPassword = localStorage.getItem('adminPassword');
    if (!adminPassword) {
      router.push('/admin');
      return;
    }

    // If editing, fetch the post
    if (isEditing) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`/api/blogs/${postId}`, {
            headers: {
              'Authorization': `Bearer ${adminPassword}`
            }
          });

          if (response.ok) {
            const post = await response.json();
            setFormData({
              title: post.title,
              slug: post.slug,
              content: post.content,
              excerpt: post.excerpt,
              tags: post.tags,
              category: post.category,
              published: post.published,
              coverImage: post.coverImage,
            });
          } else if (response.status === 401) {
            // Unauthorized, redirect to login
            localStorage.removeItem('adminPassword');
            router.push('/admin');
          } else {
            setError('Failed to fetch blog post');
          }
        } catch (error) {
          console.error('Error fetching blog post:', error);
          setError('An error occurred while fetching the blog post');
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
    }
  }, [isEditing, postId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from title
    if (name === 'title') {
      setFormData({
        ...formData,
        title: value,
        slug: slugify(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags?.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...(formData.tags || []), tagInput.trim()]
        });
      }
      setTagInput('');
    }
  };

  const handleTagRemove = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter(t => t !== tag) || []
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    const adminPassword = localStorage.getItem('adminPassword');
    if (!adminPassword) {
      router.push('/admin');
      return;
    }

    try {
      const url = isEditing ? `/api/blogs/${postId}` : '/api/blogs';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          password: adminPassword
        })
      });

      if (response.ok) {
        router.push('/admin/dashboard');
      } else if (response.status === 401) {
        // Unauthorized, redirect to login
        localStorage.removeItem('adminPassword');
        router.push('/admin');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save blog post');
      }
    } catch (error) {
      console.error('Error saving blog post:', error);
      setError('An error occurred while saving the blog post');
    } finally {
      setSaving(false);
    }
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
        <div className="flex items-center">
          <Link href="/admin/dashboard" className="text-orange-500 hover:underline mr-4">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold">
            <GradientText>{isEditing ? 'Edit Post' : 'New Post'}</GradientText>
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Published</span>
          <Switch 
            checked={formData.published || false}
            onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  required
                  placeholder="Enter post title"
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug || ''}
                  onChange={handleChange}
                  required
                  placeholder="post-url-slug"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category || 'machine-learning'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="machine-learning">Machine Learning</option>
                  <option value="web-development">Web Development</option>
                  <option value="data-science">Data Science</option>
                  <option value="programming">Programming</option>
                  <option value="career">Career</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <Label htmlFor="coverImage">Cover Image URL (optional)</Label>
                <Input
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage || ''}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <div className="flex items-center">
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagAdd}
                    placeholder="Add tag and press Enter"
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button 
                        type="button" 
                        onClick={() => handleTagRemove(tag)}
                        className="text-xs ml-1 hover:text-red-500"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt || ''}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Write a brief summary of your post"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Content</Label>
              <Tabs defaultValue="edit" value={previewTab} onValueChange={setPreviewTab}>
                <TabsList className="mb-2">
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="edit" className="mt-0">
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content || ''}
                    onChange={handleChange}
                    rows={20}
                    placeholder="Write your post content in Markdown"
                    className="font-mono"
                  />
                </TabsContent>
                <TabsContent value="preview" className="mt-0">
                  <Card>
                    <CardContent className="pt-6 prose prose-orange dark:prose-invert max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                      >
                        {formData.content || '*No content to preview*'}
                      </ReactMarkdown>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push('/admin/dashboard')}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={saving}
              className="flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Post
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}