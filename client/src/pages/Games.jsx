import React, { useMemo, useState } from 'react';
import GameGrid from '../components/GameGrid';
import SearchBar from '../components/SearchBar';
import { categories, games } from '../data/games';

function Games() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All games');
  const filteredGames = useMemo(() => games.filter(game => {
    const matchesSearch = `${game.title} ${game.category}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (activeCategory === 'All games' || game.category === activeCategory);
  }), [search, activeCategory]);

  return (
    <div className="catalog-page">
      <span className="section-kicker">THE PLAYGROUND</span>
      <h1>Find your next <span>favorite</span></h1>
      <p className="catalog-intro">A whole world of fun, one click away. No installs, no fuss.</p>
      <SearchBar value={search} onChange={setSearch} placeholder="Search games or categories..." />
      <div className="filter-list">
        {['All games', ...categories.map(category => category.name)].map(category => (
          <button type="button" className={activeCategory === category ? 'filter-chip filter-chip--active' : 'filter-chip'} key={category} onClick={() => setActiveCategory(category)}>{category}</button>
        ))}
      </div>
      <div className="section-heading catalog-heading"><h2>{activeCategory} <span className="games-count">{filteredGames.length} games</span></h2></div>
      <GameGrid games={filteredGames} />
    </div>
  );
}

export default Games;
