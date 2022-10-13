const handleCreateDeck = (req, res, db) => {
    const { userId, deckName, description } = req.body;
    if (!deckName) {
        return res.status(400).json("Invalid submission: deck name is required");
    } else if (deckName.length > 100) {
        return res.status(400).json("Invalid submission: deck name must be no more than 100 characters long");
    } else {
        db('decks').insert({
            deck_name: deckName,
            description: description,
            user_id: userId,
            deck_created: new Date()
        }).returning('*').then(deck => res.json(deck[0]))
        .catch(err => res.status(400).json("Unable to create new deck: 1"));
    }
};

export default handleCreateDeck;
