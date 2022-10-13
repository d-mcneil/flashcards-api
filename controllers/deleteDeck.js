const handleDeleteDeck = (req, res, db) => {
    const { deckId, userId } = req.body;
    db('decks').where({deck_id:deckId}).andWhere({user_id:userId}).del().returning('deck_id')
        .then(deletedDeckId => res.json(deletedDeckId[0]))
        .catch(err => res.status(400).json("Error deleting deck: 1"))
};

export default handleDeleteDeck;
