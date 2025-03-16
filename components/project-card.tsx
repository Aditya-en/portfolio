"use client"

import { motion } from "framer-motion"

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  repoUrl: string
}

export default function ProjectCard({ title, description, technologies, repoUrl }: ProjectCardProps) {
  return (
    <motion.div
      className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech) => (
          <span key={tech} className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
            {tech}
          </span>
        ))}
      </div>
      <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
        View on GitHub
      </a>
    </motion.div>
  )
}

