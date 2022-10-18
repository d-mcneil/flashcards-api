const handleUpdateDeck = (req, res, db) => {
    const { userId, deckId, deckName, description } = req.body;
    if (!deckName) {
        return res.status(400).json("Invalid submission: deck name is required");
    } else if (deckName.length > 100) {
        return res.status(400).json("Invalid submission: deck name must be no more than 100 characters long");
    } else {
        db('decks').where({deck_id: deckId}).andWhere({user_id: userId})
            .update({deck_name: deckName, description: description})
            .returning('*').then(deck => res.json(deck[0]))
            .catch(err => res.status(400).json("Unable to update deck: 1"));
    }
};

export default handleUpdateDeck; 
