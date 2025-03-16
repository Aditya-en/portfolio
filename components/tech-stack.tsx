"use client"

import { Icon } from "@iconify/react"
import { motion } from "framer-motion"

const technologies = [
  {
    category: "Machine Learning & AI",
    items: [
      { name: "Machine Learning", icon: "vscode-icons:file-type-python" },
      { name: "Deep Learning", icon: "logos:tensorflow" },
      { name: "Natural Language Processing", icon: "carbon:nlp" },
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
    <div className="space-y-6">
      {technologies.map((category, categoryIndex) => (
        <motion.div
          key={category.category}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
        >
          <h3 className="text-xl font-semibold mb-3">{category.category}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category.items.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="flex items-center p-2 rounded-md bg-gradient-to-br from-secondary to-accent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Icon icon={tech.icon} className="w-6 h-6 mr-2" />
                <span>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

