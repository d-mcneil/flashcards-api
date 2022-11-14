const validateInput = (term, definition) => {
    if (!term || !definition) {
        res.status(400).json("Invalid submission: both term and definition are required.");
        return false;
    } else if (term.length > 255) {
        res.status(400).json("Invalid submission: term must be no more than 255 characters long.");
        return false;
    } else if (definition.length > 255) {
        res.status(400).json("Invalid submission: definition name must be no more than 255 characters long.");
        return false;
    }
    return true;
}

const handleCreateCard = (req, res, db) => {
    const { userId, deckId, term, definition } = req.body;
    const valid = validateInput(term, definition);
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
    .catch(err => res.status(400).json("Unable to create new card: 1"));
};

export default handleCreateCard;
