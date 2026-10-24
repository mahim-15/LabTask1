import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand"><Link to="/" className="brand"><span className="brand-mark">▶</span><span>play<span>loop</span></span></Link><p>Good games. Great breaks.<br />Play something fun today.</p></div>
        <div className="footer-links"><b>EXPLORE</b><Link to="/games">All games</Link><a href="/#categories">Categories</a><Link to="/premium">Playloop Plus</Link></div>
        <div className="footer-links"><b>PLAYLOOP</b><Link to="/about">About</Link><Link to="/contact">Contact</Link><a href="mailto:hello@playloop.example">Partner with us</a></div>
        <div className="footer-newsletter"><b>STAY IN THE LOOP ✦</b><p>Fresh games, straight to your inbox.</p><form onSubmit={event => event.preventDefault()}><input type="email" aria-label="Email address" placeholder="Your email address" /><button aria-label="Subscribe" type="submit">→</button></form><small>Newsletter sign-up is a visual preview.</small></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Playloop. All good vibes reserved.</span><div><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div><span>Made for play <b>♥</b></span></div>
    </footer>
  );
}

export default Footer;
