import React, { useState, useEffect } from "react";
import "./artist-card.css";
import axios from "axios";
import { Link } from 'react-router-dom';

const key = "io09K9l3ebJxmxe2";

const ArtistCard = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      axios.get(
          `https://api.songkick.com/api/3.0/search/artists.json?apikey=${key}&query=${props.artist}&per_page=1`
        )
        .then((res) => setData(res.data.resultsPage.results.artist[0]));
    };

    fetch();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const imageUrl = `https://images.sk-static.com/images/media/profile_images/artists/${data.id}/huge_avatar`;
  return (
    <div className="artist-card-container">
      <h4>{data.displayName}</h4>

      <Link className="profile-btn" to={{ 
        pathname: `/events/${data.id}`,}} >
        <img src={imageUrl}></img>
        Event
      </Link>
    </div>
  );
};

export default ArtistCard;
