import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Games from './pages/Games';
import GameDetail from './pages/GameDetail';
import Category from './pages/Category';
import About from './pages/About';
import Contact from './pages/Contact';
import Premium from './pages/Premium';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <ScrollToTop />
        <Header />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/game/:slug" element={<GameDetail />} />
            <Route path="/category/:name" element={<Category />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/privacy" element={<div className="simple-page"><h1>Privacy policy</h1><p>Publish your privacy policy here before launch.</p></div>} />
            <Route path="/terms" element={<div className="simple-page"><h1>Terms of service</h1><p>Publish your terms of service here before launch.</p></div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
