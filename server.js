import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcryptjs';

// get
import {handleGetDecks, handleGetCards} from './controllers/get.js'; // get
// post
import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signIn.js';
import handleCreateDeck from './controllers/createDeck.js';
import handleCreateCard from './controllers/createCard.js';
// put
import { handleUpdateDeck, handleUpdateDeckSettings } from './controllers/updateDeck.js';
import { handleUpdateCard, handleUpdateCardScore } from './controllers/updateCard.js';
// delete
import { handleDeleteCard, handleDeleteDeck, handleDeleteUser } from './controllers/delete.js'

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

app.get("/", (req, res) => res.json("success"));
app.get("/decks/:userId", (req, res) => {handleGetDecks(req, res, db)});
app.get("/cards/:deckId", (req, res) => {handleGetCards(req, res, db)});

app.post("/register", (req, res) => {handleRegister(req, res, db, bcrypt)});
app.post("/sign-in", (req, res) => {handleSignIn(req, res, db, bcrypt)});
app.post("/create-deck", (req, res) => {handleCreateDeck(req, res, db)});
app.post("/create-card", (req, res) => {handleCreateCard(req, res, db)});

app.put("/update-deck", (req, res) => {handleUpdateDeck(req, res, db)});
app.put("/update-card", (req, res) => {handleUpdateCard(req, res, db)});
app.put("/update-deck-settings", (req, res) => {handleUpdateDeckSettings(req, res, db)});
app.put("/update-card-score", (req, res) => {handleUpdateCardScore(req, res, db)});

app.delete("/delete-deck", (req, res) => {handleDeleteDeck(req, res, db)});
app.delete("/delete-card", (req, res) => {handleDeleteCard(req, res, db)});
app.delete("/delete-user", (req, res) => {handleDeleteUser(req, res, db)});

app.listen(PORT, () => {console.log(`Flashcards is running on port ${PORT}.`)});
