const handleReadCards = (req, res, db) => {
    const { deckId } = req.params;
    db.select('*').from('cards').where({deck_id: deckId})
        .then(cardsArray => res.json(cardsArray))
        .catch(err => res.status(400).json("Error fetching cards from user's deck: 1"))
};

export default handleReadCards;
