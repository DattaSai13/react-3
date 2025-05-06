import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero({ setUser, title, subtitle, backgroundImage }) {
  return (
    <motion.section
      className="relative bg-gradient-to-r from-gray-500 to-gray-700 text-white py-20 bg-cover bg-center"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {title || 'Welcome to CompanyPortal'}
            <span className="text-white">
              {title ? '' : ' CompanyPortal'}
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {subtitle || 'Secure document management and collaboration platform for your business needs.'}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <Link
              to="/login"
              className="bg-white text-gray-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition duration-200"
            >
              Get Started <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              to="/features"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-600 px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition duration-200"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}