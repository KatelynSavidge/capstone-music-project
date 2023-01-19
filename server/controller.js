/*
This database expects this model:
{
    username: user,
    password: pass
    artistsFollowing: []
} 
*/
const userDatabase = []

module.exports = {

    register: (req, res) => {
        let user = req.body.username;
        let pass = req.body.password;
        let body = {
            username: user,
            password: pass,
            artistsFollowing: []
        }
        for (let i = 0; i < userDatabase.length; i++) {
            let indexUser = userDatabase[i];
            if (indexUser.username === user)
                return res.status(200).send("Account already exists");
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
                console.log("Successfully logged in user " + user);
                res.status(200).send("Successfully logged in user " + user);
                return;
            }
        }
        console.log("Failed logged in user " + user);
        res.status(200).send("Failed logged in user " + user);
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
                        user.artistsFollowing.delete(z);
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
        let username = req.body.username;
        const user = userDatabase.find(user => user.username === username);
        console.log("User " + username + " follows " + user.artistsFollowing);
        res.status(200).send(user.artistsFollowing);
    }

} 