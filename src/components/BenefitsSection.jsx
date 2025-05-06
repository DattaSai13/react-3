import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, Globe, FileText } from 'lucide-react';

export default function BenefitsSection({ theme }) {
  const hoverEffect = {
    scale: 1.05,
    boxShadow: '0 0 15px rgba(75,85,99,0.5)',
    transition: { type: 'spring', stiffness: 300, duration: 0.2 },
  };

  const benefits = [
    {
      title: 'Unbreakable Security',
      description: 'Your data is protected with state-of-the-art encryption.',
      icon: <Lock size={40} className="text-gray-600" />,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    },
    {
      title: 'Global Access',
      description: 'Access your files from any device, anywhere.',
      icon: <Globe size={40} className="text-gray-600" />,
      image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa',
    },
    {
      title: 'Seamless Management',
      description: 'Organize and share files with ease.',
      icon: <FileText size={40} className="text-gray-600" />,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    },
  ];

  const benefitVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.h2
        className="text-4xl font-bold text-center mb-16"
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className={`${theme === 'dark' ? 'text-gray-600' : 'text-black'}`}>Why Choose</span> <span className={`${theme === 'light' ? 'text-gray-600' : 'text-white'}`}>CompanyPortal</span>
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className={`${theme === 'light' ? 'bg-white/80' : 'bg-gray-700/80'} rounded-xl overflow-hidden shadow-lg backdrop-blur-md border border-gray-200/30`}
            variants={benefitVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={hoverEffect}
            transition={{ delay: index * 0.1 }}
          >
            <img src={benefit.image} alt={benefit.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className={`${theme === 'light' ? 'text-gray-600' : 'text-white'} mb-4`}>{benefit.description}</p>
              <Link
                to="/features"
                className={`${theme === 'light' ? 'text-gray-600' : 'text-white'} hover:text-gray-700 font-medium flex items-center transition duration-200`}
              >
                Learn More <span className="ml-2">→</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}