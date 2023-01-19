import React, { useState } from 'react';
import useArtists from '../../hooks/useArtists';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const {searchArtist} = useArtists();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    searchArtist(event.target.value);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default SearchBar;