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
      <div className="flex items-center space-x-4">
        <Link href="/" className={pathname === "/" ? "text-primary" : "text-foreground"}>
          Home
        </Link>
        <Link href="/blogs" className={pathname === "/blogs" ? "text-primary" : "text-foreground"}>
          Blogs
        </Link>
        <button onClick={scrollToContact} className="text-foreground">
          Contact
        </button>
        <ModeToggle />
      </div>
    </motion.nav>
  )
}

