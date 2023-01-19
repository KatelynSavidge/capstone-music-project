const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const { register, login, followArtist, getArtistsFollowing } = require('./controller')

app.post("/api/register", register);
app.post("/api/login", login);
app.post("/api/followArtist", followArtist);
app.get("/api/getArtistsFollowing", getArtistsFollowing);

app.listen(4000, () => console.log("Server running on 4000"));

