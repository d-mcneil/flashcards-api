const handleCreateCard = (req, res, db) => {
    const { userId, deckId, term, definition } = req.body;
    if (!term || !definition) {
        return res.status(400).json("Invalid submission: both term and definition are required");
    } else if (term.length > 255) {
        return res.status(400).json("Invalid submission: term must be no more than 255 characters long");
    } else if (definition.length > 255) {
        return res.status(400).json("Invalid submission: definition must be no more than 255 characters long");
    }else {
        db('cards').insert({
            term: term,
            definition: definition,
            user_id: userId,
            deck_id: deckId,
            card_created: new Date()
        }).returning('*').then(card => res.json(card[0]))
        .catch(err => res.status(400).json("Unable to create new card: 1"));
    }
};

export default handleCreateCard;
