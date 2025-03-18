"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { ModeToggle } from "./mode-toggle"
import { motion } from "framer-motion"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const scrollToContact = () => {
    if (pathname !== "/") {
      router.push("/")
      // Use setTimeout to wait for navigation to complete
      setTimeout(() => {
        const contactSection = document.getElementById("contact")
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" })
        }
      }, 400)
    } else {
      const contactSection = document.getElementById("contact")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <motion.nav
      className="flex justify-center items-center p-4 bg-background"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-8"> {/* Increased spacing */}
        <Link 
          href="/" 
          className={`relative pb-2 transition-colors duration-300 ${
            pathname === "/" ? "text-orange-500" : "text-foreground hover:text-orange-500"
          }`}
        >
          <span className="relative">
            Home
            <motion.span
              className="absolute left-0 -bottom-1 w-full h-0.5 bg-orange-500"
              initial={{ scaleX: 0 }}
              animate={{ 
                scaleX: pathname === "/" ? 1 : 0,
                backgroundColor: pathname === "/" ? "#f97316" : "transparent"
              }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </span>
        </Link>

        <Link 
          href="/blogs" 
          className={`relative pb-2 transition-colors duration-300 ${
            pathname === "/blogs" ? "text-orange-500" : "text-foreground hover:text-orange-500"
          }`}
        >
          <span className="relative">
            Blogs
            <motion.span
              className="absolute left-0 -bottom-1 w-full h-0.5 bg-orange-500"
              initial={{ scaleX: 0 }}
              animate={{ 
                scaleX: pathname === "/blogs" ? 1 : 0,
                backgroundColor: pathname === "/blogs" ? "#f97316" : "transparent"
              }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </span>
        </Link>

        <button 
          onClick={scrollToContact} 
          className="text-foreground hover:text-orange-500 relative pb-2 transition-colors duration-300"
        >
          <span className="relative">
            Contact
            <motion.span
              className="absolute left-0 -bottom-1 w-full h-0.5 bg-orange-500"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </span>
        </button>
        
        <ModeToggle />
      </div>
    </motion.nav>
  )
}