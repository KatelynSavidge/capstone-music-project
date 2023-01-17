import axios from 'axios';
import {useState, useEffect, useContext} from 'react';
import artists from "../artists.json";
import SearchContext from '../context/SearchContext';

const useArtists = () => {

    const [artistsData, setArtistsData] = useState([]);
    const {searchData, setSearchData} = useContext(SearchContext);

    const loadArtist = async (artist) => {
        axios.get(
            `https://api.songkick.com/api/3.0/search/artists.json?apikey=${process.env.REACT_APP_API_KEY}&query=${artist}&per_page=1`
        )
        .then((res) => {
            setArtistsData((artistsData) => [...artistsData, res.data.resultsPage.results.artist[0]])
        });
    };

    const searchArtist = async (key) => {
        setSearchData([]);

        try {
            const data = axios.get(`https://api.songkick.com/api/3.0/search/artists.json?apikey=${process.env.REACT_APP_API_KEY}&query=${key}&per_page=10`)
            
            await data.then((res) => {
                const artist = res.data.resultsPage.results.artist;    
                if (!artist) 
                    return;
                setSearchData((searchData) => [...searchData, artist[0]])
            })

        } catch (e) {
        }
    
        console.log(searchData)
    }

    useEffect(() => {
        artists.forEach((name) => loadArtist(name))
    }, [])

    return {artistsData, searchArtist, searchData, setSearchData};
}

export default useArtists;