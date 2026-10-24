import React from 'react';
import { Link, useParams } from 'react-router-dom';
import GameGrid from '../components/GameGrid';
import { games } from '../data/games';

function Category() {
  const { name = '' } = useParams();
  const title = decodeURIComponent(name);
  const filteredGames = games.filter(game => game.category.toLowerCase() === title.toLowerCase());
  return <div className="catalog-page"><span className="section-kicker">PICK YOUR MOOD</span><h1>{title} <span>games</span></h1><p className="catalog-intro">Find your next favorite in our {title.toLowerCase()} collection.</p><div className="section-heading catalog-heading"><h2>All {title} games <span className="games-count">{filteredGames.length} games</span></h2><Link to="/games" className="text-link">All games ↗</Link></div><GameGrid games={filteredGames} /></div>;
}

export default Category;
