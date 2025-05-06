import { motion } from 'framer-motion';
import { useState } from 'react';
import { Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ setUser, setRefresh }) {
  const [uniqueNumber, setUniqueNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [theme] = useState('light'); // Hardcoded for consistency; can be made dynamic
  const navigate = useNavigate();

  // API URL (unchanged from original)
  const apiUrl = import.meta.env.VITE_API_URL || 'companyportal.great-site.net/check_number.php';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validate input: must be exactly 6 digits
    if (!uniqueNumber) {
      setError('Please enter a unique number.');
      return;
    }
    if (!/^\d{6}$/.test(uniqueNumber)) {
      setError('Unique number must be exactly 6 digits.');
      return;
    }

    setLoading(true);

    try {
      console.log('Sending request to:', apiUrl, 'with payload:', { unique_number: uniqueNumber });

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unique_number: uniqueNumber }),
      });

      console.log('Response status:', response.status, 'OK:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText || 'No response body'}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (!data || typeof data !== 'object') {
        throw new Error('Invalid server response format.');
      }

      if (data.success) {
        setUser({
          id: data.user_id,
          uniqueNumber,
          exists: data.exists,
          created_at: data.created_at,
        });
        setSuccessMessage(data.exists ? 'Welcome back!' : 'Number registered!');
        setRefresh(Date.now()); // Trigger gallery refresh
        navigate('/dashboard');
      } else {
        throw new Error(data.message || 'Operation failed.');
      }
    } catch (err) {
      console.error('Connection Error:', err);
      setError(
        err.message.includes('Failed to fetch')
          ? `Failed to connect to ${apiUrl}. Troubleshooting:
             1. Start XAMPP Apache on port 80 (XAMPP Control Panel).
             2. Verify http://localhost:80/react-31/api/check_number.php returns JSON.
             3. Ensure check_number.php is in C:\\xampp\\htdocs\\react-31\\api.
             4. Check logs: C:\\xampp\\php\\logs\\php_error_log, C:\\xampp\\apache\\logs\\error.log.
             5. If using Vite (localhost:5173), confirm CORS headers in check_number.php.
             6. Try php -S localhost:8000 and update apiUrl to http://localhost:8000/api/check_number.php.`
          : err.message.includes('Server error')
          ? `Server error: ${err.message}. Check C:\\xampp\\php\\logs\\php_error_log or MySQL in C:\\xampp\\mysql\\data.`
          : `Error: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className={`max-w-md mx-auto p-8 rounded-lg shadow-md backdrop-blur-md border border-gray-200/30 ${
        theme === 'light' ? 'bg-white/80' : 'bg-gray-700/80'
      }`}
      variants={formVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-2xl font-bold text-center text-gray-600 mb-6"
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Enter Your 6-Digit Number
      </motion.h2>

      {error && (
        <motion.div
          className="bg-red-100 text-red-700 p-3 rounded-md mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      )}

      {successMessage && (
        <motion.div
          className="bg-green-100 text-green-700 p-3 rounded-md mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {successMessage}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div variants={formVariants}>
          <label
            htmlFor="uniqueNumber"
            className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-2`}
          >
            Unique Identification Number
          </label>
          <input
            type="text"
            id="uniqueNumber"
            value={uniqueNumber}
            onChange={(e) => setUniqueNumber(e.target.value)}
            className={`w-full p-3 border ${
              theme === 'light' ? 'border-gray-300' : 'border-gray-600'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-transparent text-${
              theme === 'light' ? 'gray-700' : 'gray-200'
            } disabled:bg-gray-100`}
            placeholder="Enter 6-digit number"
            disabled={loading}
            maxLength={6}
          />
        </motion.div>

        <motion.button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md flex items-center justify-center text-white font-medium transition ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-700 hover:shadow-[0_0_10px_rgba(75,85,99,0.5)]'
          }`}
          whileHover={{ scale: loading ? 1 : 1.05 }}
          whileTap={{ scale: loading ? 1 : 0.95 }}
        >
          {loading && <Loader2 className="animate-spin mr-2" size={20} />}
          {loading ? 'Processing...' : (
            <>
              Continue <ArrowRight className="ml-2" size={20} />
            </>
          )}
        </motion.button>
      </form>

      <motion.p
        className={`mt-6 text-center text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}
        variants={formVariants}
      >
        Don't have a number? Enter a new 6-digit number to register.
      </motion.p>
    </motion.div>
  );
}
