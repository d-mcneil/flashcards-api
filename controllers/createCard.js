import { validateCardInput } from "./validateInput.js";

const handleCreateCard = (req, res, db) => {
    const { userId, deckId, term, definition } = req.body;
    const valid = validateCardInput(term, definition);
    if (!valid) {
        return;
    }
    db('cards').insert({
        term,
        definition,
        userId,
        deckId,
        cardCreated: new Date()
    }).returning(['cardId', 'term', 'definition', 'score']).then(card => res.json(card[0]))
    .catch(err => res.status(400).json("Error saving new card: 1"));
};

export default handleCreateCard;
