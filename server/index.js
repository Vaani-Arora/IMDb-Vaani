import mongoose from "mongoose";
import express from "express";
// import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import movieRoutes from "./routes/movie.js"
import reviewRoutes from "./routes/review.js"
import noteRoute from "./routes/note.js"
import morgan from "morgan";
import sessions from 'express-session';
import { register } from "./controllers/auth.js";
import cookieParser from "cookie-parser";
import { uuid } from "uuidv4";
import MovieReview from "./models/MovieReview.js"
//import MovieList from "./data/index.js"
//import Movielist from "./models/MovieList.js";
//import Movie from "./models/User.js";
//import Movies from "./models/User.js";
//import user from "./data/user.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("common"));
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://imdb-vaani.netlify.app");
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Content-Type', 'application/json; charset=utf-8')
  next();
});

app.use(sessions({
  secret: 'lets-assume-this-is-a-good-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(cookieParser());

const session = {};

function generateUserId() {
  return uuid();
}

function verifySession(sessionId) {
  const userId = session[sessionId];

  if (userId) {
    // The session ID is valid, return the user ID
    return userId;
  } else {
    // The session ID is invalid, return null
    return null;
  }
}

/* ROUTES WITH FILES */
app.post("/auth/register", register);
app.get("/feed", movieRoutes);

app.post('/login', (req, res) => {
  // Verify user credentials and generate session ID
  const { username, password } = req.body;
  const userId = generateUserId();
  const sessionId = generateUserId();
  sessions[sessionId] = userId;

  // Set session ID cookie
  res.cookie('sessionId', sessionId, { httpOnly: true });

  // Return user ID to client
  res.json({ userId });
});

app.get('/api/data', (req, res) => {
  // Verify session ID cookie and return data if valid
  const sessionId = req.cookies.sessionId;
  const userId = verifySession(sessionId);

  if (userId) {
    // The session is valid, return the data
    res.json({ data: 'Secret data' });
  } else {
    // The session is invalid, return 401 Unauthorized
    res.sendStatus(401);
  }
});

app.get('/movie', (req, res) => {
    Movie.find()
      .sort({ date: -1 })
      .then(reviews => res.json(reviews))
      .catch(error => console.error(error));
  });


/* ROUTES */
app.use("/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/:id/review", reviewRoutes);
app.use('*', noteRoute)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001;
mongoose
    .connect("mongodb+srv://vaaniarora:vaani123@view.ghp9m1b.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

        /* ADD DATA ONE TIME */
        //Movies.insertMany(user);
       //Movielist.insertMany(MovieList);
    })
    .catch((error) => console.log(`${error} did not connect`));
