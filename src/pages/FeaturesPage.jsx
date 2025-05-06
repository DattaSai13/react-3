import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function FeaturesPage() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const features = [
    {
      title: 'Unique Number Access',
      description: 'Access all your files with just your unique identification number—no complex passwords to remember.',
      icon: '🔢',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Multi-Format Support',
      description: 'Upload and view images, videos, and PDF documents all in one secure location.',
      icon: '📁',
      image: 'https://images.unsplash.com/photo-1586282391129-76a6df230234?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Automatic Organization',
      description: 'Your files are automatically organized by type and date for easy retrieval.',
      icon: '🗂️',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Secure Sharing',
      description: 'Easily share files with colleagues while maintaining control over access.',
      icon: '🔗',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className={`font-inter ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Hero
          title="Our Features"
          subtitle="Discover the tools that make CompanyPortal exceptional."
          backgroundImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3" // Tech feature image
        />
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h1 className="text-4xl font-bold text-gray-600 mb-2">Features</h1>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-12 max-w-3xl`}>
            Discover how CompanyPortal simplifies your document management while keeping your files secure and accessible.
          </p>
        </motion.div>
        <div className="space-y-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}
                variants={sectionVariants}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h2 className="text-2xl font-semibold mb-4">{feature.title}</h2>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-6`}>{feature.description}</p>
                <ul className="space-y-2">
                  {['Easy to use interface', 'Secure encryption', 'Fast uploads and downloads'].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className="bg-gray-100 text-gray-600 rounded-full p-1 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}
                variants={sectionVariants}
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(75,85,99,0.5)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="rounded-lg shadow-md w-full h-auto"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className={`${theme === 'light' ? 'bg-gray-100/80' : 'bg-gray-800/80'} p-8 rounded-lg mt-16 backdrop-blur-md border border-gray-200/30`}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(75,85,99,0.5)' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <h2 className="text-3xl font-semibold text-gray-600 mb-4">Ready to get started?</h2>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-6 max-w-2xl`}>
            Join thousands of businesses that trust CompanyPortal for their document management needs.
          </p>
          <motion.button
            className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 hover:shadow-[0_0_10px_rgba(75,85,99,0.5)] transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up Now
          </motion.button>
        </motion.div>
      </div>
      {/* <Footer theme={theme} /> */}
    </div>
  );
}