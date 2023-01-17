import "./artist-card.css";

const ArtistCard = (props) => {
  if (!props.artist) {
    return <div>Loading...</div>;
  }
  const imageUrl = `https://images.sk-static.com/images/media/profile_images/artists/${props.artist.id}/huge_avatar`;
  return (
    <div>

      <div className="artist-card-container">
        <h4>{props.artist.displayName}</h4>
        <img src={imageUrl}></img>
      </div>

      <div className="">

      </div>

    </div>
  );
};

export default ArtistCard;
