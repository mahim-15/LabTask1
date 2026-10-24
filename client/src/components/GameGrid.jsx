import React from 'react';
import GameCard from './GameCard';

function GameGrid({ games = [] }) {
  if (!games.length) {
    return <p className="text-gray-400">No games found.</p>;
  }
  return <div className="game-grid">{games.map(game => <GameCard key={game.slug} game={game} />)}</div>;
}

export default GameGrid;
