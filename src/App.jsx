import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import ContactPage from './pages/ContactPage';
import UserDashboard from './pages/UserDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(Date.now());

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage setUser={setUser} setRefresh={setRefresh} />} />
            <Route path="/login" element={<LoginForm setUser={setUser} setRefresh={setRefresh} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/dashboard"
              element={
                user ? (
                  <UserDashboard user={user} setUser={setUser} refresh={refresh} setRefresh={setRefresh} />
                ) : (
                  <div className="text-center p-8">
                    <p className="text-red-500">Please log in to access the dashboard.</p>
                  </div>
                )
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;