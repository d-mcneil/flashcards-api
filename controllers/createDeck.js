const validateInput = (deckName) => {
    if (!deckName) {
        res.status(400).json("Invalid submission: deck name is required");
        return false;
    } else if (deckName.length > 100) {
        res.status(400).json("Invalid submission: deck name must be no more than 100 characters long");
        return false;
    }
    return true;
}

const handleCreateDeck = (req, res, db) => {
    const { userId, deckName, description } = req.body;
    const valid = validateInput(deckName);
    if (!valid) {
        return;
    }
    db('decks').insert({
        deckName,
        description,
        userId,
        deckCreated: new Date()
    }).returning('*').then(deck => res.json(deck[0]))
    .catch(err => res.status(400).json("Error saving new deck: 1"));
};

export default handleCreateDeck;
