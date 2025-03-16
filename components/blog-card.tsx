import { motion } from 'framer-motion'

interface BlogCardProps {
  title: string
  excerpt: string
  date: string
}

export default function BlogCard({ title, excerpt, date }: BlogCardProps) {
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
      <p className="text-muted-foreground mb-4">{excerpt}</p>
      <p className="text-sm text-muted-foreground">{date}</p>
    </motion.div>
  )
}

