import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcryptjs';
import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signIn.js';
import handleReadDecks from './controllers/readDecks.js';


import databaseInfo from './databaseInfo.js';
const db = knex(databaseInfo);
// const db = knex(
//     {
//       client: "pg",
//       connection: {
//         connectionString: process.env.DATABASE_URL,
//         ssl: {
//           rejectUnauthorized: false
//         }
//       },
//     }
// );

const app = express();
// const PORT = process.env.PORT;
const PORT = 3001;
// const corsOptions = {
//   origin: process.env.ORIGIN_URL,
//   optionsSuccessStatus: 200
// };

app.use(express.json());
// app.use(cors(corsOptions));
app.use(cors());

// register             post
// sign in              post
// create deck          post
// read decks           get
// create card          post
// read cards in deck   get
// update card score    put
// here im not sure if i should do update score and update term/definition differently for cards
// update deck          put
// delete card          delete
// delete deck          delete
// delete user          delete
app.get("/", (req, res) => res.json("success"));
app.post("/register", (req, res) => {handleRegister(req, res, db, bcrypt)});
app.post("/sign-in", (req, res) => {handleSignIn(req, res, db, bcrypt)});
// app.post("/create-deck", (req, res) => {handleCreateDeck(req, res, db)});
app.get("/read-decks/:userId", (req, res) => {handleReadDecks(req, res, db)});
// app.post("/create-card", (req, res) => {handleCreateCard(req, res, db)});
// app.get("/read-cards", (req, res) => {handleReadCards(req, res, db)});
// app.put("/update-score", (req, res) => {handleUpdateScore(req, res, db)});
// app.put("/update-deck", (req, res) => {handleUpdateDeck(req, res, db)});
// app.delete("/delete-card", (req, res) => {handleDeleteCard(req, res, db)});
// app.delete("/delete-deck", (req, res) => {handleDeleteDeck(req, res, db)});
// app.delete("/delete-user", (req, res) => {handleDeleteUser(req, res, db)});



// app.listen(PORT, () => {console.log(`Flashcards is running on port ${PORT}.`)});
app.listen(PORT, () => {console.log(`Flashcards is running on port ${PORT}.`)});





