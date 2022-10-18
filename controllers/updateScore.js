const handleUpdateScore = (req, res, db) => {
    const { userId, cardId, incrementValue } = req.body;
    db('cards').where({card_id: cardId}).andWhere({user_id: userId})
        .increment('score', incrementValue)
        .returning('card_id').then(card => res.json(card[0]))
        .catch(err => res.status(400).json("Unable to update score: 1"));
};

export default handleUpdateScore;
