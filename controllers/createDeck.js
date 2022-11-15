import { validateDeckInput } from "./validateInput.js";

const handleCreateDeck = (req, res, db) => {
    const { userId, deckName, description } = req.body;
    const valid = validateDeckInput(deckName);
    if (!valid) {
        return;
    }
    db('decks').insert({
        deckName,
        description,
        userId,
        deckCreated: new Date()
    }).returning(['deckId', 'userId', 'deckName', 'description']).then(deck => res.json(deck[0]))
    .catch(err => res.status(400).json("Error saving new deck: 1"));
};

export default handleCreateDeck;
