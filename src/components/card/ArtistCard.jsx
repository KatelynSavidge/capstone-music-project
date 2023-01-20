import "./artist-card.css";
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import UserContext from "../../context/UserContext";


const ArtistCard = (props) => {
  const { userContext } = useContext(UserContext);
  const [buttonText, setButtonText] = useState('Follow')
  const { profileArtistsData, setProfileArtistsData, artist } = props

  useEffect(() => {
    if (profileArtistsData && setProfileArtistsData) {
      const artistIndex = profileArtistsData.indexOf(artist)
      if (artistIndex != null)
        setButtonText('Unfollow');
      else
        setButtonText('Follow');
    }
  }, []);
  
  if (!props.artist) {
    return <div>Loading...</div>;
  }

  //TODO SET BUTTON TEXT AS A PROP HERE depending on if the user is following them on the profile or not.


  const handleClick = () => {
    try {
      const body = {
        username: userContext,
        artistName: artist.displayName
      }
      console.log(body.username + " " + body.artistName);
      axios.post("http://localhost:4000/api/followArtist/", body)
      .then((res) => {
          const response = res.data;
          if (response === "Unfollowed") {
            setButtonText('Follow');
            console.log("unfollowing artist")
            if (profileArtistsData && setProfileArtistsData) {
              console.log("remove artist")
              const artistIndex = profileArtistsData.indexOf(artist)
              const artistCopy = [...profileArtistsData]
              artistCopy.splice(artistIndex, 1)
              console.log("index=", artistIndex, "arr:", artistCopy)
              setProfileArtistsData(artistCopy)
            }
          }
          if (response === "Followed") {
            setButtonText("Unfollow");
          }
          
      })
    } catch (err) {
     alert("error followed")
    }
  }
 

  const imageUrl = `https://images.sk-static.com/images/media/profile_images/artists/${props.artist.id}/huge_avatar`;
  return (
    <div>
      <div className="artist-card-container">
        <h4>{artist.displayName}</h4>
        <img src={imageUrl}></img>
        <button 
          type="submit" 
          className="artist-submit"
          onClick={handleClick}>{buttonText}
      </button>
      </div>
    </div>
  );
};

export default ArtistCard;
