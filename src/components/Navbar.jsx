import { NavLink } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  return (
    <motion.nav
      className={`sticky top-0 z-50 ${theme === 'light' ? 'bg-white/80' : 'bg-gray-900/80'} backdrop-blur-md shadow-md`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, duration: 0.2 }}
          >
            <span className={`font-bold text-xl ${theme === 'light' ? 'text-gray-600' : 'text-white'}`}>
              CompanyPortal
            </span>
          </motion.div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${theme === 'light' ? 'text-gray-600' : 'text-white'} hover:text-gray-400 focus:outline-none`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <motion.div key={item.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? 'bg-gray-600 text-white'
                        : theme === 'light'
                        ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'
                        : 'text-white hover:bg-gray-700 hover:text-white'
                    } transition duration-200`
                  }
                >
                  {item.name}
                </NavLink>
              </motion.div>
            ))}
            <motion.button
              onClick={toggleTheme}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                theme === 'light' ? 'bg-gray-100 text-gray-600' : 'bg-gray-700 text-white'
              } hover:bg-gray-200 hover:shadow-[0_0_10px_rgba(75,85,99,0.5)] transition duration-200`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {theme === 'light' ? (
                <>
                  <Moon size={20} className="mr-2" /> Dark Mode
                </>
              ) : (
                <>
                  <Sun size={20} className="mr-2" /> Light Mode
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className={`${theme === 'light' ? 'bg-white/80' : 'bg-gray-900/80'} md:hidden backdrop-blur-md`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? 'bg-gray-600 text-white'
                        : theme === 'light'
                        ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'
                        : 'text-white hover:bg-gray-700 hover:text-white'
                    } transition duration-200`
                  }
                >
                  {item.name}
                </NavLink>
              </motion.div>
            ))}
            <motion.button
              onClick={() => {
                toggleTheme();
                setIsOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                theme === 'light' ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-700' : 'text-white hover:bg-gray-700 hover:text-white'
              } transition duration-200`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}