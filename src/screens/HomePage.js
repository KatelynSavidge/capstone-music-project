import React, { useContext, useEffect, useState } from 'react';
import ArtistCard from '../components/card/ArtistCard';
import useArtists from '../hooks/useArtists';
import _ from 'lodash';
import SearchBar from '../components/card/SearchBar';
import SearchContext from '../context/SearchContext';

const HomePage = () => {
  const {artistsData} = useArtists();
  const {searchData} = useContext(SearchContext);

  return (
    <div>
        <h1 className='home-text1'> MusicNow</h1>
        <h2 className='home-text2'>Find and track your favorite artists</h2>

        <div className='search-bar'>
          <SearchBar/>
        </div>

        <div className='flex-container-column'>
          <div className='flex-container-row'>
              {searchData && searchData.map((artist, index) => (
                <ArtistCard key={index} artist={artist}/>
              ))}
          </div>
        </div>

        <div className='flex-container-column'>
          <h2>Suggested Artists</h2>
          
          <div className='flex-container-row'>
            {artistsData.map((artist, index) => (
              <ArtistCard key={index} artist={artist}/>
            ))}
          </div>
        </div>
        
    </div>
  )
}

export default HomePage;