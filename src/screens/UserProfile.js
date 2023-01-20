import axios from 'axios';
import ArtistCard from '../components/card/ArtistCard';
import {useState, useEffect, useContext} from 'react';
import UserContext from '../context/UserContext';

const UserProfile = () => {
  const [profileArtistsData, setProfileArtistsData] = useState([]);
  const { userContext } = useContext(UserContext);

  console.log(userContext);
  
  useEffect(() => {
    try {
      if (userContext == null)
        return;

      console.log("useeffect " + userContext);
      axios.get(`http://localhost:4000/api/getArtistsFollowing?username=${userContext}`)
      .then(res => {
        console.log(JSON.stringify(res.data) + " is our res ");
        let artistNames = res.data;
        artistNames.forEach((name) => loadArtist(name))
      })

      axios.get("http://localhost:4000/api/artists")
      .then(res=> console.log())
    } catch (err) {
      alert('Error gathering user data.');
    }
  }, [])

  const loadArtist = async (artist) => {
        axios.get(
            `https://api.songkick.com/api/3.0/search/artists.json?apikey=${process.env.REACT_APP_API_KEY}&query=${artist}&per_page=1`
        )
        .then((res) => {
            setProfileArtistsData((profileArtistsData) => [...profileArtistsData, res.data.resultsPage.results.artist[0]])
        });
    };

  if (userContext == null) {
    return (
      <div>
        <h1>Login to see your profile.</h1>
      </div>
    )
  }

  console.log("artists followed:", profileArtistsData)

  return (
    <div>
      <h1>Welcome, {userContext}</h1>
      <div className='flex-container-column'>
          <h2 className='suggested-text'>Followed Artists</h2>
          
          <div className='flex-container-row'>
            {profileArtistsData.map((artist, index) => (
              <ArtistCard key={index} artist={artist} profileArtistsData={profileArtistsData} setProfileArtistsData={setProfileArtistsData} />
            ))}
          </div>
        </div>
    </div>
    
  )
}

export default UserProfile;