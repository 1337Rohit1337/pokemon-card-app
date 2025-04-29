import React from 'react';

function PokemonCard({ pokemon }) {
  return (
    <div className="pokemon-card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <p>ID: {pokemon.id}</p>
      <p>{pokemon.types.map(t => t.type.name).join(', ')}</p>
    </div>
  );
}

export default PokemonCard;
