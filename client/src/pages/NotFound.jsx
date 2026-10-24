import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return <div className="simple-page not-found"><span>🙈</span><h1>Oops, wrong turn.</h1><p>That page seems to have wandered off.</p><Link to="/" className="button button--dark">Back to home <span>→</span></Link></div>;
}

export default NotFound;
