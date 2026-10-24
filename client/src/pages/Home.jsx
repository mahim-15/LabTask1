import React from 'react';
import { Link } from 'react-router-dom';
import GameGrid from '../components/GameGrid';
import { categories, games, imageUrl } from '../data/games';

function Home() {
  const featuredGame = games.find(game => game.slug === 'baper-rasta');
  const playableGames = games.filter(game => game.gameType);
  const popularGames = games.filter(game => !game.gameType).slice(0, 4);
  const popularSlugs = new Set(popularGames.map(game => game.slug));
  const newGames = games.filter(game => game.badge === 'NEW' && !game.gameType && !popularSlugs.has(game.slug));

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT FAVORITE GAME IS HERE</div>
          <h1>Big fun.<br /><span>Zero downloads.</span></h1>
          <p>Jump into the good stuff. Discover the best free games, made for quick breaks and all-night sessions.</p>
          <div className="hero-actions">
            <Link className="button button--dark" to={`/game/${featuredGame.slug}`}>Play Baper Rasta <span>→</span></Link>
            <span className="hero-social-proof"><span className="avatar-stack">🎮🕹️✨</span> <b>12k+</b> players today</span>
          </div>
          <div className="hero-spark hero-spark--one">✦</div>
          <div className="hero-spark hero-spark--two">✳</div>
        </div>
        <div className="hero-art">
          <img src={featuredGame.thumbnailUrl || imageUrl(featuredGame.image, 1200)} alt="Baper Rasta racing game" />
          <div className="hero-art__shade" />
          <span className="hero-art__label">✦ FEATURED GAME</span>
          <div className="hero-game-info">
            <div><span>RACING · FREE TO PLAY</span><h2>Baper Rasta</h2></div>
            <Link to={`/game/${featuredGame.slug}`} aria-label="Play Baper Rasta now" className="hero-play">▶</Link>
          </div>
          <span className="hero-sticker">RACE<br />RIGHT<br />NOW 🛺</span>
        </div>
        <div className="hero-count"><b>01</b><span>/ 04</span><i /></div>
      </section>

      <section className="games-section instant-games" id="play-now">
        <div className="section-heading">
          <div><span className="section-kicker">NO DOWNLOADS. NO WAITING.</span><h2>Pick a game &amp; play now <span className="heading-emoji">🎮</span></h2></div>
          <span className="playable-count">✦ {playableGames.length} READY TO PLAY</span>
        </div>
        <GameGrid games={playableGames} />
      </section>

      <section className="category-section" id="categories">
        <div className="section-heading">
          <div><span className="section-kicker">PICK YOUR MOOD</span><h2>Find your kind of fun</h2></div>
          <Link to="/games" className="text-link">All categories <span>↗</span></Link>
        </div>
        <div className="category-list">
          {categories.map(category => (
            <Link to={`/category/${encodeURIComponent(category.name)}`} className={`category-pill category-pill--${category.color}`} key={category.name}>
              <span>{category.icon}</span>{category.name}<span className="category-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="games-section" id="popular">
        <div className="section-heading">
          <div><span className="section-kicker">THE CROWD FAVORITES</span><h2>Popular right now <span className="heading-emoji">🔥</span></h2></div>
          <Link to="/games" className="text-link">See all games <span>↗</span></Link>
        </div>
        <GameGrid games={popularGames} />
      </section>

      <section className="promo-row">
        <div className="promo-copy">
          <span className="section-kicker">A LITTLE SOMETHING EXTRA</span>
          <h2>More play.<br />Less waiting.</h2>
          <p>Make your breaks count with hand-picked games, fresh finds and a little friendly competition.</p>
          <Link to="/premium" className="button button--light">Meet Playloop Plus <span>→</span></Link>
        </div>
        <div className="promo-art">
          <span className="promo-star">✦</span>
          <div className="promo-orbit promo-orbit--one" />
          <div className="promo-orbit promo-orbit--two" />
          <div className="promo-controller">🎮</div>
          <span className="promo-tag">YOUR PLAYTIME<br />JUST GOT BETTER</span>
        </div>
      </section>

      <section className="games-section new-games">
        <div className="section-heading">
          <div><span className="section-kicker">FRESH OFF THE PRESS</span><h2>New games to try <span className="heading-emoji">✨</span></h2></div>
          <Link to="/games" className="text-link">Explore new games <span>↗</span></Link>
        </div>
        <GameGrid games={newGames} />
      </section>

      <section className="leaderboard">
        <div className="leaderboard-copy"><span className="section-kicker">FRIENDLY COMPETITION</span><h2>Play. Score.<br />Climb the ranks.</h2><p>Think you’ve got the high score? This week’s players are on a roll.</p><Link to="/games" className="button button--dark">Play for a high score <span>→</span></Link></div>
        <div className="leaderboard-card">
          <div className="leaderboard-title"><span>🏆</span><div><b>Weekly leaderboard</b><small>NEON DASH · RESETS IN 2 DAYS</small></div><span className="live-dot" /></div>
          {[['01', 'PixelPanda', '12,840', '🥇'], ['02', 'mika.moves', '10,260', '🥈'], ['03', 'StarryJay', '9,415', '🥉']].map(player => (
            <div className="leaderboard-player" key={player[1]}><span className="player-rank">{player[0]}</span><span className="player-avatar">{player[3]}</span><b>{player[1]}</b><strong>{player[2]} <small>pts</small></strong></div>
          ))}
          <div className="ad-note"><span>AD SPACE</span><small>Made possible by our partners</small></div>
        </div>
      </section>

      <section className="bottom-cta">
        <span>🙌</span><div><b>Good games. Great breaks.</b><p>Your next favorite is just one click away.</p></div><Link to="/games" className="button button--dark">Find a game <span>→</span></Link>
      </section>
    </div>
  );
}

export default Home;
