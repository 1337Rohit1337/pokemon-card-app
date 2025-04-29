import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await res.json();
        const details = await Promise.all(
          data.results.map(p => fetch(p.url).then(r => r.json()))
        );
        setPokemonList(details);
        setLoading(false);
      } catch {
        setError('Unable to load Pokémon.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredList = pokemonList
    .filter(p => p.name.includes(searchTerm.toLowerCase()))
    .filter(p => filterType ? p.types.some(t => t.type.name === filterType) : true);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const typeOptions = [...new Set(pokemonList.flatMap(p => p.types.map(t => t.type.name)))];

  return (
    <div className="App">
      <h1>Pokémon Explorer</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="">All Types</option>
          {typeOptions.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className="pokemon-grid">
        {filteredList.map(pokemon => (
          <div key={pokemon.id} className="pokemon-card">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
            <p>ID: {pokemon.id}</p>
            <p>Type: {pokemon.types.map(t => t.type.name).join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
