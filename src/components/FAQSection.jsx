import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQSection({ theme }) {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What is CompanyPortal?',
      answer: 'CompanyPortal is a secure document management and collaboration platform designed for businesses.',
    },
    {
      question: 'How secure is my data?',
      answer: 'We use state-of-the-art encryption to ensure your data is protected at all times.',
    },
    {
      question: 'Can I access files on mobile?',
      answer: 'Yes, CompanyPortal is accessible from any device, anywhere, with an internet connection.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Contact our support team to inquire about trial options for your business.',
    },
    {
      question: 'How does the unique number system work?',
      answer: 'Our unique number system replaces traditional usernames and passwords, providing a simpler and secure way to access your files.',
    },
    {
      question: 'Can I share files with my team?',
      answer: 'Yes, you can securely share files with colleagues while maintaining control over access permissions.',
    },
    {
      question: 'What file types are supported?',
      answer: 'CompanyPortal supports images, videos, PDFs, and other common file formats.',
    },
    {
      question: 'How do I recover a lost file?',
      answer: 'Our support team can assist with file recovery. Contact us at support@companyportal.com.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqVariants = {
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
        <span className={`${theme === 'light' ? 'text-gray-600' : 'text-white'}`}>Frequently Asked Questions</span>
        
      </motion.h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className={`${theme === 'light' ? 'bg-white/80' : 'bg-gray-700/80'} rounded-lg shadow-md backdrop-blur-md border border-gray-200/30`}
            variants={faqVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-100/50 transition duration-200"
            >
              <span className={`${theme === 'light' ? 'text-gray-600' : 'text-white'} text-lg font-semibold`}>{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className={`${theme === 'light' ? 'text-gray-600' : 'text-white'}`} size={24} />
              ) : (
                <ChevronDown className={`${theme === 'light' ? 'text-gray-600' : 'text-white'}`} size={24} />
              )}
            </button>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4"
              >
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-white'}`}>{faq.answer}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}