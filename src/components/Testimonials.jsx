import { motion } from 'framer-motion';

export default function Testimonials({ theme }) {
  const testimonials = [
    {
      name: 'Emily Chen',
      role: 'CEO, TechTrend Innovations',
      quote: 'CompanyPortal has transformed how we manage our documents. The unique number system is a game-changer!',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Michael Patel',
      role: 'IT Director, GlobalCorp',
      quote: 'The security and ease of use are unmatched. Our team loves the seamless file-sharing features.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Sarah Johnson',
      role: 'Freelance Designer',
      quote: 'I can access my files from anywhere, and the platform is so intuitive. Highly recommend!',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    },
  ];

  const testimonialVariants = {
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
        <span className={`${theme === 'light' ? 'text-gray-600' : 'text-white'}`}> What Our Users Say</span>
     
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className={`${theme === 'light' ? 'bg-white/80' : 'bg-gray-700/80'} rounded-xl p-6 shadow-lg backdrop-blur-md border border-gray-200/30`}
            variants={testimonialVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(75,85,99,0.5)' }}
            transition={{ type: 'spring', stiffness: 300, duration: 0.2 }}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
            />
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-white'} mb-4 italic`}>{`"${testimonial.quote}"`}</p>
            <h3 className="font-semibold">{testimonial.name}</h3>
            <p className={`${theme === 'light' ? 'text-gray-400' : 'text-white'} text-sm`}>{testimonial.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}