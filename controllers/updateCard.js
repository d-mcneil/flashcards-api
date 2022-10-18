const handleUpdateCard = (req, res, db) => {
    const { userId, cardId, term, definition } = req.body;
    if (!term || !definition) {
        return res.status(400).json("Invalid submission: both term and definition are required");
    } else if (term.length > 255) {
        return res.status(400).json("Invalid submission: term must be no more than 255 characters long");
    } else if (definition.length > 255) {
        return res.status(400).json("Invalid submission: definition must be no more than 255 characters long");
    } else {
        db('cards').where({card_id: cardId}).andWhere({user_id: userId})
            .update({term, definition})
            .returning('card_id').then(card => res.json(card[0]))
            .catch(err => res.status(400).json("Unable to update card: 1"));
    }
};

export default handleUpdateCard;
