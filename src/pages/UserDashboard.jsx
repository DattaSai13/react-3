import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import MediaGallery from '../components/MediaGallery';
import FileUpload from '../components/FileUpload';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function UserDashboard({ user, setUser, refresh, setRefresh }) {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');
  const [uploadType, setUploadType] = useState(null);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
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
  title="Your Dashboard"
  subtitle="Manage your files and collaborate with ease."
  backgroundImage="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" // Dashboard/tech interface image
/>
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          className="flex justify-between items-center mb-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-700 hover:shadow-[0_0_10px_rgba(75,85,99,0.5)] transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="mr-1" size={18} />
            Back to Home
          </motion.button>
          <motion.button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 hover:shadow-[0_0_10px_rgba(239,68,68,0.5)] transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </motion.div>

        <motion.div
          className={`${
            theme === 'light' ? 'bg-gray-100/80' : 'bg-gray-800/80'
          } p-6 rounded-lg mb-8 backdrop-blur-md border border-gray-200/30`}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(75,85,99,0.5)' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <h1 className="text-2xl font-bold text-gray-600 mb-2">Welcome to Your Dashboard</h1>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Your unique number:{' '}
            <span className="font-mono bg-gray-200/50 px-2 py-1 rounded">{user.uniqueNumber}</span>
          </p>
          {!user.exists && (
            <p className="mt-2 text-gray-600">This is a new number. You can now upload your files.</p>
          )}
        </motion.div>

        <motion.div
          className="mb-6 flex space-x-4"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {['image', 'video', 'pdf'].map((type, index) => (
            <motion.button
              key={index}
              onClick={() => setUploadType(uploadType === type ? null : type)}
              className={`${
                theme === 'light' ? 'bg-gray-600' : 'bg-gray-700'
              } text-white px-4 py-2 rounded-md hover:bg-gray-700 hover:shadow-[0_0_10px_rgba(75,85,99,0.5)] transition duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {uploadType === type ? 'Cancel' : `Upload ${type.charAt(0).toUpperCase() + type.slice(1)}`}
            </motion.button>
          ))}
        </motion.div>

        {uploadType && (
          <motion.div
            className="mb-6"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <FileUpload userId={user.id} setRefresh={setRefresh} fileType={uploadType} />
          </motion.div>
        )}

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <MediaGallery userId={user.id} refresh={refresh} setRefresh={setRefresh} />
        </motion.div>
      </div>
      {/* <Footer theme={theme} /> */}
    </div>
  );
}