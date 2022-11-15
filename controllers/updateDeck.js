import { validateDeckInput } from "./validateInput.js";

export const handleUpdateDeck = (req, res, db) => {
    const { userId, secondaryId, primaryColumn, secondaryColumn } = req.body;
    const deckId = secondaryId;
    const deckName = primaryColumn;
    const description = secondaryColumn;
    const valid = validateDeckInput(deckName);
    if (!valid) {
        return;
    }
    db('decks').where({deckId}).andWhere({userId})
        .update({deckName, description})
        .returning('deckId').then(deckId => res.json(deckId[0]))
        .catch(err => res.status(400).json("Error updating deck: 1"));
}
