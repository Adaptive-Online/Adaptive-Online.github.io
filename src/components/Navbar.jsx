import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import BookingButton from './BookingButton'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: 'https://heuristix.substack.com', target: '_blank', rel: 'noopener noreferrer' },
]

const BRAND_NAME = "Adaptive Online"

const springAnimation = {
  whileHover: { scale: 1.05 },
  transition: { type: "spring", stiffness: 400, damping: 10 }
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      const elementId = href.substring(2)
      document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const NavLink = ({ href, name, className, onClick, ...rest }) => (
    <a
      href={href}
      onClick={(e) => {
        handleNavClick(e, href)
        onClick?.()
      }}
      className={className}
      {...rest}
    >
      {name}
    </a>
  )

  return (
    <header className="bg-white/80 dark:bg-dark/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <nav className="w-full" aria-label="Global">
        <div className="flex items-center justify-between py-6">
          {/* Brand */}
          <div className="flex lg:flex-1">
            <a href="/" className="flex items-center">
              <motion.span 
                className="text-2xl font-heading text-gray-900 dark:text-white"
                {...springAnimation}
              >
                {BRAND_NAME}
              </motion.span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-12 items-center">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                {...item}
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
              />
            ))}
            <BookingButton />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
          {/* Background overlay */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" 
            aria-hidden="true" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          
          {/* Menu panel */}
          <div className="fixed inset-y-0 right-0 z-[101] w-full overflow-y-auto bg-white dark:bg-dark px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-xl">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-2xl font-heading text-gray-900 dark:text-white">
                  {BRAND_NAME}
                </span>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      {...item}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    />
                  ))}
                </div>
                <div className="py-6">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
