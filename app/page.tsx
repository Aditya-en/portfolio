"use client"
import dynamic from "next/dynamic"
import GradientText from "@/components/gradient-text"
import { Github, Linkedin, Mail } from "lucide-react"
import TechStack from "@/components/tech-stack"
import ProjectCard from "@/components/project-card"

const MotionSection = dynamic(() => import("@/components/motion-section"), { ssr: false })
const MotionLink = dynamic(() => import("@/components/motion-link"), { ssr: false })
const NeuralNetworkBackground = dynamic(() => import("@/components/neural-network-background"), { ssr: false })

export default function Home() {
  return (
    <>
      <NeuralNetworkBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <MotionSection
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">
            Hi, I'm <GradientText>Aditya Sahani</GradientText>
          </h1>
          <p className="text-xl mb-4">An aspiring ML engineer with a passion for web development and machine learning.</p>
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
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-center">
            <GradientText>Tech Stack and Skills</GradientText>
          </h2>
          <TechStack />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-xl mb-4">Blogs coming soon...</p>
            </div>
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
    </>
  )
}