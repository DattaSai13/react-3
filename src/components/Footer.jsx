import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer({ theme }) {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
  };

  return (
    <motion.footer
      className={`bg-gradient-to-r from-gray-600 to-gray-800 text-white py-16 relative overflow-hidden ${
        theme === 'light' ? 'bg-opacity-80' : 'bg-opacity-90'
      } backdrop-blur-md`}
      variants={footerVariants}
      initial="hidden"
      animate="visible"
    >
      <style>
        {`
          .shooting-star {
            position: absolute;
            width: 2px;
            height: 20px;
            background: white;
            opacity: 0.7;
            animation: shoot 3s infinite;
            transform: rotate(45deg);
          }
          @keyframes shoot {
            0% { transform: translateX(-100vw) translateY(0); opacity: 0.7; }
            50% { opacity: 1; }
            100% { transform: translateX(100vw) translateY(100vh); opacity: 0; }
          }
          .social-icon {
            transition: transform 0.3s ease, color 0.3s ease;
          }
          .social-icon:hover {
            transform: translateY(-5px);
            color: #ffffff;
          }
          .footer-link {
            position: relative;
            transition: color 0.3s ease;
          }
          .footer-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -2px;
            left: 0;
            background-color: #ffffff;
            transition: width 0.3s ease;
          }
          .footer-link:hover::after {
            width: 100%;
          }
          .footer-link:hover {
            color: #ffffff;
          }
        `}
      </style>
      <div className="shooting-star" style={{ top: '10%', left: '20%', animationDelay: '0s' }} />
      <div className="shooting-star" style={{ top: '30%', left: '50%', animationDelay: '1s' }} />
      <div className="shooting-star" style={{ top: '50%', left: '80%', animationDelay: '2s' }} />
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-4">CompanyPortal</h3>
          <p className="text-gray-200 mb-6">
            Empowering businesses with secure, seamless document management solutions.
          </p>
          <div className="flex space-x-4">
            {[
              { icon: <Twitter size={24} />, link: '#' },
              { icon: <Linkedin size={24} />, link: '#' },
              { icon: <Github size={24} />, link: '#' },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                className="social-icon text-gray-200"
                whileHover={{ scale: 1.2, rotate: 5, boxShadow: '0 0 10px rgba(75,85,99,0.5)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {['Home', 'Features', 'About', 'Contact'].map((item, index) => (
              <li key={index}>
                <Link to={`/${item.toLowerCase()}`} className="footer-link text-gray-200">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h4 className="text-lg font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            {['Blog', 'Help Center', 'API Docs', 'Community'].map((item, index) => (
              <li key={index}>
                <a href="#" className="footer-link text-gray-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <p className="text-gray-200 mb-2">Email: support@companyportal.com</p>
          <p className="text-gray-200 mb-2">Phone: +1 (800) 123-4567</p>
          <p className="text-gray-200">Address: 123 Tech Street, San Francisco, CA</p>
        </motion.div>
      </div>
      <motion.div
        className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>© {new Date().getFullYear()} CompanyPortal. All rights reserved.</p>
      </motion.div>
    </motion.footer>
  );
}