// app/blogs/[slug]/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BlogPost } from '@/types/blog';
import GradientText from '@/components/gradient-text';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

// Add type for custom components
interface MarkdownComponents {
  [nodeType: string]: React.ElementType<any> | React.ComponentType<any>;
}

export default function BlogPostPage() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        const response = await fetch(`/api/blogs/${slug}`);
        if (response.ok) {
          console.log(response)
          const data = await response.json();
          setPost(data);
        } else {
          console.error('Failed to fetch blog post');
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);
  // Custom Markdown components
  const MarkdownComponents: MarkdownComponents = {
    p: ({ children }) => {
      // Check if the paragraph contains only an image
      if (React.Children.toArray(children).every(
        (child) => React.isValidElement(child) && child.type === 'img'
      )) {
        return <>{children}</>;
      }
      return <p className="mb-4">{children}</p>;
    },
    // Handle YouTube URLs specifically
    a: ({ href, children }) => {
      if (href?.includes('youtu.be') || href?.includes('youtube.com')) {
        const videoId = href.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/)?.[1];
        return (
          <div className="my-8 aspect-video rounded-lg shadow-xl overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        );
      }
    },
    h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold my-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold my-4">{children}</h3>,
    ul: ({ children }) => <ul className="list-disc pl-8 my-4 pl-3" >{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-8 my-4">{children}</ol>,
    li: ({ children }) => <li className="mb-2">{children}</li>,
    hr: () => <hr className="my-8 border-t-2 border-orange-500/20" />,

    div: ({ node, className, children, ...props }) => {
      if (className?.includes('video-container')) {
        return (
          <div className="my-8 aspect-video rounded-lg shadow-xl overflow-hidden">
            {children}
          </div>
        );
      }
      return <div {...props}>{children}</div>;
    },

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-orange-500 pl-4 my-6 text-muted-foreground italic">
        {children}
      </blockquote>
    ),

    table: ({ children }) => (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse">
          {children}
        </table>
      </div>
    ),

    iframe: ({ src, title }) => (
      <div className="my-8 aspect-video rounded-lg shadow-xl overflow-hidden">
        <iframe
          src={src}
          title={title || 'Embedded content'}
          className="w-full h-full"
          allowFullScreen
        />
      </div>
    ),

    img: ({ src, alt }) => (
        <img
          src={src || ''}
          alt={alt || 'Blog image'}
          className="mx-auto rounded-lg shadow-xl transition-all duration-300 
                   group-hover:shadow-2xl max-w-full h-auto object-cover"
          loading="lazy"
        />
    ),
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link href="/blogs" className="text-orange-500 hover:underline flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/blogs" className="text-orange-500 hover:underline flex items-center mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blog
      </Link>

      <article className="max-w-3xl mx-auto">
        {post.coverImage && (
          <div className="w-full h-72 mb-6 overflow-hidden rounded-lg">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">
          <GradientText>{post.title}</GradientText>
        </h1>

        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {Math.ceil(post.content.split(' ').length / 200)} min read
          </div>
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="prose prose-orange dark:prose-invert prose-base max-w-none 
        leading-7 lg:leading-8">  {/* Increased line height */}
          <ReactMarkdown
            components={MarkdownComponents}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}