export const handleDeleteDeck = (req, res, db) => {
    const { userId, deckId } = req.body;
    db('decks').where({deckId}).andWhere({userId}).del().returning('deckId')
        .then(deletedDeckId => res.json(deletedDeckId[0]))
        .catch(err => res.status(400).json("Error deleting deck: 1"))
};
