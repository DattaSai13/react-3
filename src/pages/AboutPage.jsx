import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function AboutPage() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'CEO',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Maria Garcia',
      role: 'CTO',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'David Kim',
      role: 'Lead Developer',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Sarah Williams',
      role: 'UX Designer',
      photo: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    },
  ];

  return (
    <div className={`font-inter ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Hero
          title="About Us"
          subtitle="Learn about our mission to empower businesses worldwide."
          backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
        />
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={sectionVariants}>
            <h2 className="text-3xl font-semibold mb-4">
            <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>Our Story</span>
            </h2>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-white'} mb-4`}>
              Founded in 2023, CompanyPortal began with a simple mission: to provide businesses with a secure,
              easy-to-use platform for managing their important documents and media files.
            </p>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-white'}`}>
              Our unique number system was developed to eliminate the need for complex usernames and passwords,
              making file access simpler while maintaining high security standards.
            </p>
          </motion.div>
          <motion.div
            className={`${theme === 'light' ? 'bg-gray-100/80' : 'bg-gray-800/80'} p-6 rounded-lg backdrop-blur-md`}
            variants={sectionVariants}
            whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(75,85,99,0.5)' }}
            transition={{ type: 'spring', stiffness: 300, duration: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Our team"
              className="rounded-lg shadow-md w-full h-auto"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="mb-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-4">
          <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>Our Technology</span>
          </h2>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-white'} mb-6`}>
            We use cutting-edge technology to ensure your files are always secure and accessible:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Advanced Encryption',
                description: 'All files are encrypted both in transit and at rest.',
              },
              {
                title: 'Reliable Storage',
                description: 'Redundant storage ensures your files are always available.',
              },
              {
                title: 'Fast Delivery',
                description: 'Optimized networks for quick file access worldwide.',
              },
            ].map((tech, index) => (
              <motion.div
                key={index}
                className={`${theme === 'light' ? 'bg-white/80' : 'bg-gray-700/80'} p-6 rounded-lg shadow-md backdrop-blur-md border border-gray-200/30`}
                variants={sectionVariants}
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(75,85,99,0.5)' }}
                transition={{ type: 'spring', stiffness: 300, duration: 0.2 }}
              >
                <h3 className="font-semibold text-gray-400 mb-2">{tech.title}</h3>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-white'}`}>{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-4">
          <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>Our Team</span>
          </h2>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-white'} mb-6`}>
            We're a diverse team of engineers, designers, and security experts dedicated to building the best
            file management platform for businesses of all sizes.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((person, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={sectionVariants}
                whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(75,85,99,0.5)' }}
                transition={{ type: 'spring', stiffness: 300, duration: 0.2 }}
              >
                <img
                  src={person.photo}
                  alt={person.name}
                  className="rounded-full w-32 h-32 object-cover mx-auto mb-3 shadow-md"
                />
                <h3 className={`${theme === 'light' ? 'text-gray-800' : 'text-white'} text-sm`}>{person.name}</h3>
                <p className={`${theme === 'light' ? 'text-dark' : 'text-gray-400'} text-sm`}>{person.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      {/* <Footer theme={theme} /> */}
    </div>
  );
}