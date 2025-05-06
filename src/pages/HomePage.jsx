import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import LoginForm from '../components/LoginForm';
import BenefitsSection from '../components/BenefitsSection';
import CallToAction from '../components/CallToAction';
import FAQSection from '../components/FAQSection';
import Testimonials from '../components/Testimonials';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function HomePage({ setUser, setRefresh }) {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  return (
    <div className={`font-inter ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Hero
          setUser={setUser}
          title="Welcome to CompanyPortal"
          subtitle="Secure document management and collaboration platform for your business needs."
          backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa"
        />
      </motion.div>
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 py-20"
      >
        <LoginForm setUser={setUser} setRefresh={setRefresh} />
      </motion.section>
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`${theme === 'light' ? 'bg-gray-100/80' : 'bg-gray-800/80'} py-24 backdrop-blur-md`}
      >
        <BenefitsSection theme={theme} />
      </motion.section>
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-24"
      >
        <CallToAction theme={theme} />
      </motion.section>
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={`${theme === 'light' ? 'bg-gray-100/80' : 'bg-gray-800/80'} py-24 backdrop-blur-md`}
      >
        <FAQSection theme={theme} />
      </motion.section>
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-24"
      >
        <Testimonials theme={theme} />
      </motion.section>
      {/* <Footer theme={theme} /> */}
      {showTopBtn && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gray-600 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 hover:shadow-[0_0_10px_rgba(75,85,99,0.5)] transition duration-200"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </div>
  );
}