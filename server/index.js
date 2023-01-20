require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");

const app = express();

app.use(cors());
app.use(express.json());

const secureCookie = process.env.SECURE_SESSION === "true"
app.use(session({
    secret: process.env.SESSION_SECRET || "some secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
        secure: secureCookie,
        sameSite: true,
        httpOnly: true
    }
}))

const { 
    register, 
    login, 
    logout, 
    followArtist, 
    getArtistsFollowing,
    validateSession,
    getSession,
    getArtists
} = require('./controller')

app.post("/api/register", register);
app.post("/api/login", login);
app.post("/api/followArtist", followArtist);
app.get("/api/getArtistsFollowing", getArtistsFollowing);
app.get("/api/artists", getArtists)

app.get("/api/validateSession", validateSession);
app.get("/api/getSession", getSession);

// should add middleware to check if logged in before logging out
app.get("/api/logout", logout)

app.listen(4000, () => console.log("Server running on 4000"));

