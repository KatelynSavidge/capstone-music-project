/*
This database expects this model:
{
    username: user,
    password: pass
    artistsFollowing: []
} 
*/
const userDatabase = []

require("dotenv").config()
const axios = require("axios");

const artistList = [
    "Adele",
    "The All-American Rejects",
    "Ariana Grande",
    "Avril Lavigne",
    "Bad Bunny",
    "Billie Eilish",
    "Black Eyed Peas",
    "Blink-182",
    "Carrie Underwood",
    "Demi Lovato",
    "Deftones",
    "Doja Cat",
    "Dua Lipa",
    "Dr Dre",
    "Ed Sheeran",
    "Eminem",
    "Evanescence",
    "Fall Out Boy",
    "Fergie",
    "Fleetwood Mac",
    "Florence + The Machine",
    "Foo Fighters",
    "Guns N Roses",
    "Good Charlotte",
    "Gwen Stefani",
    "Halsey",
    "Hayley Williams",
    "Harry Styles",
    "Imagine Dragons",
    "Jay-Z",
    "Jeezy",
    "Jessie J",
    "Jimmy Eat World",
    "Justin Bieber",
    "Kacey Musgraves",
    "Katy Perry",
    "Knocked Loose",
    "Kesha",
    "Kendrick Lamar",
    "The Killers",
    "Lady GaGa",
    "Lana Del Rey",
    "Lil Wayne",
    "Lorde",
    "Miley Cyrus",
    "Maroon 5",
    "Metallica",
    "Mumford & Sons",
    "Megan Thee Stallion",
    "My Chemical Romance",
    "Nicki Minaj",
    "Nine Inch Nails",
    "Neck Deep",
    "OneRepublic",
    "Post Malone",
    "Paramore",
    "Phoebe Bridgers",
    "Red Hot Chili Peppers",
    "Rihanna",
    "Rise Against",
    "Rob Zombie",
    "Selena Gomez",
    "Spiritbox",
    "The Killers",
    "Tame Impala",
    "The Smashing Pumpkins",
    "The Story So Far",
    "Snoop Dogg",
    "Static Dress",
    "Sublime",
    "Sum 41",
    "SZA",
    "Taylor Swift",
    "Tim McGraw",
    "The Weeknd",
    "Weezer",
    "will.i.am"
 ]

module.exports = {

    register: (req, res) => {
        let user = req.body.username;
        let pass = req.body.password;
        let body = {
            username: user,
            password: pass,
            artistsFollowing: []
        }
        if (!user || !pass) {
            return res.status(400).send("Invalid username or password")
        }
        for (let i = 0; i < userDatabase.length; i++) {
            let indexUser = userDatabase[i];
            if (indexUser.username === user)
                return res.status(400).send("Account already exists");
        }
        userDatabase.push(body);
        console.log("Registered account " + user + " " + pass);
        console.log("Accounts list " + JSON.stringify(userDatabase));
        res.status(200).send("Account registered successfully");
    },
    
    login: (req, res) => {
        let user = req.body.username;
        let pass = req.body.password;
        for (let i = 0; i < userDatabase.length; i++) {
            let indexUser = userDatabase[i];
            if (indexUser.username === user && indexUser.password === pass) {

                req.session.user = {
                    username: user,
                    password: pass
                }

                console.log("user session:", req.session.user)

                console.log("Successfully logged in user " + user);
                res.status(200).send("Successfully logged in user " + user);
                return;
            }
        }
        console.log("Failed logged in user " + user);
        res.status(400).send("Failed logged in user " + user);
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },

    validateSession: (req, res) => {
        if (!req.session.user) {
            return res.sendStatus(401);
        }

        res.sendStatus(200)
    },

    getSession: (req, res) => {
        if (!req.session.user) {
            return res.sendStatus(401);
        }

        // remove the password from the session before sending in the resposne
        res.status(200).json(req.session.user);
    },

    followArtist: (req, res) => {
        let username = req.body.username;
        let artistName = req.body.artistName;
        console.log("processing for " + username + " artistName " + artistName);
        for (let i = 0; i < userDatabase.length; i++) {
            let indexUser = userDatabase[i];
            if (indexUser.username === username) {
                //Loop the entire artists following list to see if the artist is
                //being followed already. If they are we will unfollow them.
                for (let z = 0; z < indexUser.artistsFollowing.length; z++) {
                    if (indexUser.artistsFollowing[z] === artistName) {
                        indexUser.artistsFollowing.splice(z, 1);
                        console.log("Successfully unfollowed artist " + artistName);
                        res.status(200).send("Unfollowed");
                        return;
                    }
                }
                //Otherwise we follow them.
                indexUser.artistsFollowing.push(artistName);
                console.log("Successfully followed artist " + artistName);
                res.status(200).send("Followed");
                return;
            }
        }
        console.log("Failed to process.");
        res.status(200).send("Failed to process.");
    },

    //This endpoint takes in a username and returns a list of artists that they follow in the res.
    getArtistsFollowing: (req, res) => {
        let { username } = req.query;
        if (username === 'undefined')
            return;
        console.log("username: " + username)
        const user = userDatabase.find(user => user.username === username);
        console.log("User " + username + " follows " + user.artistsFollowing);
        res.status(200).send(user.artistsFollowing);
    },

    getArtists: async (req, res) => {
        console.log(JSON.stringify(req.session.user))

        const artists = []

        for (let i = 0; i < artistList.length; i++) {
            const artistResponse = await axios.get(
                `https://api.songkick.com/api/3.0/search/artists.json?apikey=${process.env.REACT_APP_API_KEY}&query=${artistList[i]}&per_page=1`
            )

            const artist = artistResponse.data

            const artistThumbnail = `https://images.sk-static.com/images/media/profile_images/artists/${artist.id}/huge_avatar`
            artists.push({
                id: artist.id,
                thumbnail: artistThumbnail,
                name: artist.displayName
            })
        }

        res.status(200).json(artists)
    }

} 