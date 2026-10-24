import React from 'react';
import { Link } from 'react-router-dom';
import { imageUrl } from '../data/games';

function GameCard({ game }) {
  return (
    <Link className="game-card" to={`/game/${game.slug}`}>
      <div className={`game-card__art game-card__art--${game.color}`}>
        {game.thumbnailIcon ? (
          <div className={`game-cover game-cover--${game.gameType}`} aria-hidden="true">
            <span className="game-cover__spark game-cover__spark--one">✦</span>
            <span className="game-cover__spark game-cover__spark--two">✧</span>
            <div className="game-cover__symbol">
              <span>{game.thumbnailIcon}</span>
              {game.thumbnailMark && <span>{game.thumbnailMark}</span>}
            </div>
            <span className="game-cover__title">{game.thumbnailLabel}</span>
          </div>
        ) : <img src={game.thumbnailUrl || imageUrl(game.image)} alt="" loading="lazy" />}
        {game.badge && <span className={`game-badge game-badge--${game.badge.toLowerCase()}`}>{game.badge}</span>}
        <span className={`game-card__play${game.gameType || game.embedUrl ? '' : ' game-card__play--preview'}`}>
          <span aria-hidden="true">{game.gameType || game.embedUrl ? '▶' : '↗'}</span>
          <span>{game.gameType || game.embedUrl ? 'Play' : 'Preview'}</span>
        </span>
      </div>
      <div className="game-card__info">
        <div>
          <h3>{game.title}</h3>
          <span>{game.category}</span>
        </div>
        <span className="game-rating">★ {game.rating}</span>
      </div>
    </Link>
  );
}

export default GameCard;
