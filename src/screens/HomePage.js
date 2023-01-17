import React, {useState, useEffect, useContext} from 'react';
import ArtistCard from '../components/card/ArtistCard';
import axios from 'axios'; 
import artists from '../artists.json';
import magnify from '../assets/magnify.png';
import _ from 'lodash';

const HomePage = () => {
  const shuffledArtists = _.shuffle(artists);
  return (
    <div>
        <h1 className='home-text1'> MusicNow</h1>
        <h2 className='home-text2'>Find and track your favorite artists</h2>

        <div className='search-bar'>
          <input type="text" placeholder='search' id='search'/>
          <button><img width={13} className='magnify' src={magnify} align="left"/></button>

        </div>

        <div className='flex-container-column'>
          <h2>Suggested Artists</h2>
          
          <div className='flex-container-row'>
            {shuffledArtists.map((artist, index) => (
              <ArtistCard key={index} artist={artist}/>
            ))}
          </div>
        </div>
        
    </div>
  )
}

// const lost3 = () => {
//   let arr = ["Green day", "paramore", "etc"]
//   let key = 'io09K9l3ebJxmxe2';

//     axios
//       .get(`https://api.songkick.com/api/3.0/search/artists.json?apikey=${key}&query=${arr}`)
//       .then((res) => {
//           console.log(res.data.resultsPage.results.artist);
//           //setMovieList(res.resultsPage.results.artist);
//           return res.data.resultsPage.results.artist;
//       });
//   }


export default HomePage;