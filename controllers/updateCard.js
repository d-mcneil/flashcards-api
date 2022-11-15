import { validateCardInput } from "./validateInput.js";

export const handleUpdateCard = (req, res, db) => {
    const { userId, secondaryId, primaryColumn, secondaryColumn } = req.body;
    const cardId = secondaryId;
    const term = primaryColumn;
    const definition = secondaryColumn;
    const valid = validateCardInput(term, definition);
    if (!valid) {
        return;
    }
    db('cards').where({cardId}).andWhere({userId})
        .update({term, definition})
        .returning('cardId').then(cardId => res.json(cardId[0]))
        .catch(err => res.status(400).json("Error updating card: 1"));
}
