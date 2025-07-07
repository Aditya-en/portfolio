import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { BlogPost } from '@/types/blog';

export function useBlogs() {
  const { data, error, isLoading } = useSWR<BlogPost[]>('/api/blogs', fetcher);

  return {
    posts: data,
    isLoading,
    isError: !!error,
  };
}