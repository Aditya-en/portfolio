"use client"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import GradientText from "@/components/gradient-text"
import { Github, Linkedin, Mail, Calendar, Tag } from "lucide-react"
import TechStack from "@/components/tech-stack"
import ProjectCard from "@/components/project-card"
import { BlogPost } from "@/types/blog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const MotionSection = dynamic(() => import("@/components/motion-section"), { ssr: false })
const MotionLink = dynamic(() => import("@/components/motion-link"), { ssr: false })
const NeuralNetworkBackground = dynamic(() => import("@/components/neural-network-background"), { ssr: false })

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blogs', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setPosts(data.slice(0, 3)); // Get only top 3 posts
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
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 relative z-10 max-w-7xl">

      <NeuralNetworkBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <MotionSection
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Hi, I'm <GradientText>Aditya Sahani</GradientText>
          </h1>
          <p className="text-xl md:text-2xl mb-6">An aspiring ML engineer with a passion for web development and machine learning.</p>

          <div className="flex justify-center space-x-4">
            <MotionLink
              href="mailto:adityasahani443@gmail.com"
              className="flex items-center text-foreground hover:text-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="w-5 h-5 mr-2" />
              Email
            </MotionLink>
            <MotionLink
              href="https://github.com/Aditya-en"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-foreground hover:text-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </MotionLink>
            <MotionLink
              href="https://www.linkedin.com/in/adityasahani443"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-foreground hover:text-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </MotionLink>
          </div>
        </MotionSection>

        <MotionSection
          className="mb-16 flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-full max-w-4xl">
            <h2 className="text-3xl font-bold mb-4 text-center">
              <GradientText>Tech Stack and Skills</GradientText>
            </h2>
            <TechStack />
          </div>

        </MotionSection>

        <MotionSection
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-center">
            <GradientText>Projects</GradientText>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProjectCard
              title="Online Code Editor"
              description="A web based code editor with file system and integrated terminal"
              technologies={["React", "Node.js", "MongoDB", "Express"]}
              repoUrl="https://github.com/Aditya-en/parth-code-editor"
            />
            <ProjectCard
              title="Video Transcoder Service"
              description="A fairly auto scaling video transcoding service on AWS infrastructure"
              technologies={["Express", "FFmpeg", "AWS"]}
              repoUrl="https://github.com/Aditya-en/video-transcoder"
            />
            <ProjectCard
              title="Trained Variational AutoEncoder"
              description="A VAE architecture model to losslessly compress images and reconstruct them"
              technologies={["Python", "PyTorch"]}
              repoUrl="https://github.com/Aditya-en/vae"
            />
          </div>
        </MotionSection>

        <MotionSection
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-center">
            <GradientText>Latest Blogs</GradientText>
          </h2>
          {loading ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link href={`/blogs/${post.slug}`} key={post.id} className="transition-transform hover:scale-105">
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                    {post.coverImage && (
                      <div className="w-full h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {post.excerpt}
                      </p>
                    </CardContent>
                    <CardFooter className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl mb-4">Blogs coming soon...</p>
              <p className="text-muted-foreground">Check back later for insightful posts about machine learning, project builds, and philosophy.</p>
            </div>
          )}
          <div className="flex justify-center mt-8">
            <Link href="/blogs" className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              View All Posts
            </Link>
          </div>
        </MotionSection>

        <MotionSection
          id="contact"
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-center">
            <GradientText>Contact</GradientText>
          </h2>
          <p className="mb-4 text-center">Feel free to reach out to me through any of the following channels:</p>
          <div className="flex flex-col items-center space-y-2">
            <MotionLink
              href="mailto:adityasahani443@gmail.com"
              className="flex items-center text-foreground hover:text-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="w-5 h-5 mr-2" />
              adityasahani443@gmail.com
            </MotionLink>
            <MotionLink
              href="https://github.com/Aditya-en"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-foreground hover:text-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub: Aditya-en
            </MotionLink>
            <MotionLink
              href="https://www.linkedin.com/in/adityasahani443"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-foreground hover:text-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn: Aditya Sahani
            </MotionLink>
          </div>
        </MotionSection>
      </div>
      </div>
  )
}