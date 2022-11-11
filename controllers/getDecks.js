const handleGetDecks = (req, res, db) => {
    const { userId } = req.params;
    db.select('*').from('decks').where({userId})
        .then(decksArray => res.json(decksArray))
        .catch(err => res.status(400).json("Error fetching decks: 1"))
};

export default handleGetDecks; 
