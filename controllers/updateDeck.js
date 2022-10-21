export const handleUpdateDeckName = (req, res, db) => {
    const { userId, deckId, deckName } = req.body;
    if (!deckName) {
        return res.status(400).json("Invalid submission: deck name is required");
    } else if (deckName.length > 100) {
        return res.status(400).json("Invalid submission: deck name must be no more than 100 characters long");
    } else {
        db('decks').where({deck_id: deckId}).andWhere({user_id: userId})
            .update({deck_name: deckName})
            .returning('deck_id').then(deck => res.json(deck[0]))
            .catch(err => res.status(400).json("Unable to update deck name: 1"));
    }
};

export const handleUpdateDeckDescription = (req, res, db) => {
    const { userId, deckId, description } = req.body;
    db('decks').where({deck_id: deckId}).andWhere({user_id: userId})
        .update({description})
        .returning('deck_id').then(deck => res.json(deck[0]))
        .catch(err => res.status(400).json("Unable to update deck description: 1"));
};

export const handleUpdateDeckSettings = (req, res, db) => {
    const { userId, deckId  } = req.body;
    let { deckPercentage, definitionFirst } = req.body;
    if (typeof deckPercentage !== 'number'){
        deckPercentage = 100;
    } else if (deckPercentage < 1) {
        deckPercentage = 1;
    } else if (deckPercentage > 100) {
        deckPercentage = 100;
    } else {
        deckPercentage = Math.round(deckPercentage);
    }
    if (typeof definitionFirst !== 'boolean') {
        definitionFirst = false;
    }
    db('decks').where({deck_id: deckId}).andWhere({user_id: userId})
        .update({definition_first: definitionFirst, deck_percentage: deckPercentage})
        .returning('deck_id').then(deck => res.json(deck[0]))
        .catch(err => res.status(400).json("Unable to save deck settings: 1"));
};
