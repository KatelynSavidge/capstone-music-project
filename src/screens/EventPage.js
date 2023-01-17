import React, { useState, useEffect } from "react";
import axios from "axios";

const key = "io09K9l3ebJxmxe2";

const EventPage = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      axios.get(
          `https://api.songkick.com/api/3.0/artists/${props.artistId}/calendar.json?apikey=${key}`
        )
        .then((res) => setData(res.data.resultsPage.results));
    };

    fetch();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const imageUrl = `https://images.sk-static.com/images/media/profile_images/artists/${data.id}/huge_avatar`;

  console.log("FFS DATA " + data);
  return (
    <div>
      <ul>
        {data.map(event => (
          <li key={event.location}>{event.displayName}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventPage;
