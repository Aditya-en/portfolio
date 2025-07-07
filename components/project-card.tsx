"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  repoUrl: string
  liveUrl?: string
  imageUrl?: string
}

export default function ProjectCard({ title, description, technologies, repoUrl, liveUrl, imageUrl }: ProjectCardProps) {
  return (
    <motion.div
      className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col bg-card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {imageUrl && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span key={tech} className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center space-x-4 mt-auto pt-2">
          <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:text-orange-400 transition-colors">
            <Github className="w-4 h-4 mr-1" />
            GitHub
          </a>
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:text-orange-400 transition-colors">
              <ExternalLink className="w-4 h-4 mr-1" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}