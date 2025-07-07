"use client"

import { Icon } from "@iconify/react"
import { motion } from "framer-motion"

const technologies = [
  {
    category: "Machine Learning & AI",
    items: [
      { name: "Machine Learning", icon: "vscode-icons:file-type-python" },
      { name: "Deep Learning", icon: "logos:tensorflow" },
      { name: "Computer Vision", icon: "carbon:image-search" },
      { name: "Generative AI", icon: "carbon:machine-learning-model" },
      { name: "PyTorch", icon: "logos:pytorch-icon" },
      { name: "TensorFlow", icon: "logos:tensorflow" },
      { name: "Scikit-learn", icon: "simple-icons:scikitlearn" },
      { name: "Pandas", icon: "simple-icons:pandas" },
      { name: "NumPy", icon: "simple-icons:numpy" },
    ],
  },
  {
    category: "Web Development",
    items: [
      { name: "React.js", icon: "logos:react" },
      { name: "Node.js", icon: "logos:nodejs-icon" },
      { name: "Express.js", icon: "simple-icons:express" },
      { name: "Next.js", icon: "logos:nextjs-icon" },
      { name: "MongoDB", icon: "logos:mongodb-icon" },
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "JavaScript", icon: "logos:javascript" },
      { name: "HTML5", icon: "logos:html-5" },
      { name: "CSS3", icon: "logos:css-3" },
      { name: "Docker", icon: "logos:docker-icon" },
      { name: "AWS", icon: "logos:aws" },
      { name: "Git", icon: "logos:git-icon" },
    ],
  },
]


export default function TechStack() {
  return (
    <div className="space-y-8">
      {technologies.map((category, categoryIndex) => (
        <motion.div
          key={category.category}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-primary/90">{category.category}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category.items.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="flex flex-col items-center p-6 rounded-xl bg-background/50 border border-border/50 shadow-sm hover:shadow-md transition-shadow backdrop-blur-sm"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 150,
                  damping: 10
                }}
              >
                <div className="mb-3 p-3 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
                  <Icon icon={tech.icon} className="w-8 h-8 text-primary" />
                </div>
                <span className="text-center font-medium text-sm md:text-base">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
