import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function ContactPage() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

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
  title="Get in Touch"
  subtitle="We're here to help with any questions or support needs."
  backgroundImage="https://images.unsplash.com/photo-1557426272-fc91fdb8f385" // Communication/customer support image
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
            <h2 className="text-3xl font-semibold text-gray-600 mb-6">Get in Touch</h2>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-8`}>
              Have questions about CompanyPortal or need support with your account? Our team is here to help you with any inquiries you may have.
            </p>
            <div className="space-y-6">
              {[
                {
                  icon: <MapPin className="text-gray-600" size={20} />,
                  title: 'Our Office',
                  details: '123 Business Park, Suite 456<br />San Francisco, CA 94107',
                },
                {
                  icon: <Mail className="text-gray-600" size={20} />,
                  title: 'Email Us',
                  details: 'support@companyportal.com<br />sales@companyportal.com',
                },
                {
                  icon: <Phone className="text-gray-600" size={20} />,
                  title: 'Call Us',
                  details: '+1 (555) 123-4567<br />Mon-Fri, 9am-5pm PST',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  variants={sectionVariants}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(75,85,99,0.5)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className={`${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'} p-3 rounded-full mr-4`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-600 mb-1">{item.title}</h3>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`} dangerouslySetInnerHTML={{ __html: item.details }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className={`${theme === 'light' ? 'bg-white/80' : 'bg-gray-700/80'} p-6 rounded-lg shadow-md backdrop-blur-md border border-gray-200/30`}
            variants={sectionVariants}
            whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(75,85,99,0.5)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h2 className="text-3xl font-semibold text-gray-600 mb-6">Send a Message</h2>
            <form className="space-y-4">
              {['name', 'email', 'subject'].map((field, index) => (
                <motion.div key={index} variants={sectionVariants}>
                  <label htmlFor={field} className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-1`}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    className={`w-full px-4 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-transparent text-${
                      theme === 'light' ? 'gray-700' : 'gray-200'
                    }`}
                    placeholder={`Your ${field}`}
                  />
                </motion.div>
              ))}
              <motion.div variants={sectionVariants}>
                <label htmlFor="message" className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-1`}>
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className={`w-full px-4 py-2 border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-transparent text-${
                    theme === 'light' ? 'gray-700' : 'gray-200'
                  }`}
                  placeholder="Your message here..."
                ></textarea>
              </motion.div>
              <motion.button
                type="submit"
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 hover:shadow-[0_0_10px_rgba(75,85,99,0.5)] transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold text-gray-600 mb-6">Find Us on the Map</h2>
          <motion.div
            className={`${theme === 'light' ? 'bg-gray-100/80' : 'bg-gray-800/80'} h-64 rounded-lg overflow-hidden backdrop-blur-md border border-gray-200/30`}
            whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(75,85,99,0.5)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.788803042044!2d-122.4194156846821!3d37.77492997975938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </motion.div>
        </motion.div>
      </div>
      {/* <Footer theme={theme} /> */}
    </div>
  );
}