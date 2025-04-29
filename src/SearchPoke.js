import React from 'react';

function SearchFilter({ searchTerm, setSearchTerm, filterType, setFilterType, types }) {
  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <select value={filterType} onChange={e => setFilterType(e.target.value)}>
        <option value="">All Types</option>
        {types.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </div>
  );
}

export default SearchFilter;
