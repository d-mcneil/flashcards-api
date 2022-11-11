const handleGetCards = (req, res, db) => {
    const { deckId } = req.params;
    db.select('*').from('cards').where({deckId})
        .then(cardsArray => res.json(cardsArray))
        .catch(err => res.status(400).json("Error fetching cards: 1"))
};

export default handleGetCards; 
