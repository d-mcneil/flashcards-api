const handleReadDecks = (req, res, db) => {
    const { userId } = req.params;
    db.select('*').from('decks').where({user_id: userId})
        .then(decksArray => res.json(decksArray))
        .catch(err => res.status(400).json("Error fetching user's decks: 1"))
};

export default handleReadDecks; 
