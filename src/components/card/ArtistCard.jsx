import "./artist-card.css";
import React, { useState, useContext } from 'react';
import axios from 'axios'
import UserContext from "../../context/UserContext";
// import Swal from "sweetalert2";

const ArtistCard = (props) => {
  const { userContext } = useContext(UserContext);
  const [buttonText, setButtonText] = useState('Follow')

  if (!props.artist) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {
    try {
      const body = {
        username: {userContext},
        artistName: props.artist.displayName
      }
      axios.post("http://localhost:4000/api/followArtist/", body)
      .then((res) => {
          const response = res.data;
          if (response === "Unfollowed") {
            setButtonText('Follow');
          }
          if (response === "Followed") {
            setButtonText("Unfollow");
          }
          alert(response);
      })
    } catch (err) {
      alert('Error creating user');
    }
  }
  
  // const handlePurchase = () => {
  //     Swal.fire("You've followed an artist")
  // }

  const imageUrl = `https://images.sk-static.com/images/media/profile_images/artists/${props.artist.id}/huge_avatar`;
  return (
    <div>
      <div className="artist-card-container">
        <h4>{props.artist.displayName}</h4>
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
