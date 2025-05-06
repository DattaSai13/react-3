import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CallToAction({ theme }) {
  return (
    <div className="max-w-7xl mx-auto px-4 text-center">
      <motion.h2
        className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} text-4xl font-bold mb-6`}
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Ready to Transform Your Workflow?
      </motion.h2>
      <motion.p
        className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} text-lg mb-10`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Join thousands of businesses streamlining their document management with CompanyPortal.
      </motion.p>
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Link
          to="/dashboard"
          className="inline-flex items-center bg-gray-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-700 transition duration-300"
        >
          Start Now <ArrowRight className="ml-2" size={24} />
        </Link>
      </motion.div>
    </div>
  );
}