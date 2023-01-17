import React, { useState, useEffect } from "react";
import "./event-card.css";
import axios from "axios";

const EventCard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
          axios.get(
              `https://api.songkick.com/api/3.0/search/artists.json?apikey=${key}&query=${props.artist}&per_page=${props.eventCount}`
            )
            .then((res) => setData(res.data.resultsPage.results));
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

    <a href={data.uri} target="_blank">
      <img src={imageUrl}></img>
    </a>

  </div>
  )
}

export default EventCard;