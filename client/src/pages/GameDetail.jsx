import React from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import GameGrid from '../components/GameGrid';
import PlayableGame from '../components/PlayableGame';
import { games, imageUrl } from '../data/games';

function GameDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const game = games.find(item => item.slug === slug);
  if (!game) return <div className="simple-page"><h1>Game not found</h1><Link to="/games" className="text-link">Browse all games →</Link></div>;

  return (
    <div className="detail-page">
      <div className="game-page-nav">
        <button className="button button--secondary game-back-button" onClick={() => location.key === 'default' ? navigate('/games') : navigate(-1)}>← <span>Back</span></button>
        <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/games">Games</Link><span>/</span>{game.title}</div>
      </div>
      <div className="detail-layout">
        <div className="detail-main">
          {game.embedUrl && <div className="embedded-game-toolbar"><span>EXTERNAL GAME{game.creator ? ` · BY ${game.creator.toUpperCase()}` : ''}</span><a href={game.embedUrl} target="_blank" rel="noopener noreferrer">Open game in a new tab ↗</a></div>}
          <div className={`game-stage${game.gameType ? ' game-stage--playable' : ''}${game.embedUrl ? ' game-stage--embedded' : ''}`} style={{ '--game-image': `url("${imageUrl(game.image, 1400)}")` }}>
            {game.gameType ? <PlayableGame type={game.gameType} /> : game.embedUrl ? <iframe className="game-embed" src={game.embedUrl} title={`${game.title} game`} sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-popups allow-popups-to-escape-sandbox" allow="fullscreen; autoplay; gamepad" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <div className="game-coming-soon" style={{ backgroundImage: `linear-gradient(#211a3866, #211a38c9), url("${imageUrl(game.image, 900)}")` }}><span>✦ COMING SOON</span><h2>This game is on its way.</h2><Link to="/games">Play Snake or Tic-Tac-Toe instead →</Link></div>}
          </div>
          <div className="detail-title"><div><span className="section-kicker">{game.category} · FREE TO PLAY</span><h1>{game.title}</h1></div><span className="game-rating">★ {game.rating}</span></div>
          <p className="detail-description">{game.description || `Ready for a quick burst of fun? Jump into ${game.title}, play at your own pace and see if you can beat your best score. No downloads needed.`}</p>
          <div className="ad-banner"><span>ADVERTISEMENT</span><b>Your ad could be here</b><small>Reserved for future advertising partners</small></div>
        </div>
        <aside className="detail-aside">
          <div className="aside-card"><span className="section-kicker">GAME DETAILS</span><h3>Ready when you are.</h3><p>Play instantly in your browser. Come back anytime for another round.</p><div className="aside-stat"><span>Category</span><b>{game.category}</b></div><div className="aside-stat"><span>Players today</span><b>{game.players} online</b></div><Link to={`/category/${encodeURIComponent(game.category)}`} className="text-link">More {game.category} games →</Link></div>
          <div className="ad-rectangle"><span>AD SPACE</span><small>Reserved for future partners</small></div>
        </aside>
      </div>
      <section className="games-section related-games"><div className="section-heading"><div><span className="section-kicker">KEEP THE FUN GOING</span><h2>You might also like</h2></div><Link to="/games" className="text-link">See all games ↗</Link></div><GameGrid games={games.filter(item => item.slug !== slug).slice(0, 4)} /></section>
    </div>
  );
}

export default GameDetail;
