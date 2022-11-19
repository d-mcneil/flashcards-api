export const handleGetDecks = (req, res, db) => {
    const { userId } = req.params;
    db.select(['deckId', 'userId', 'deckName', 'description']).from('decks').where({userId})
        .then(decksArray => res.json(decksArray))
        .catch(err => res.status(400).json("Error fetching decks: 1"))
};

export const handleGetCards = (req, res, db) => {
    const { deckId } = req.params;
    db.select(['cardId', 'term', 'definition', 'score']).from('cards').where({deckId})
        .then(cardsArray => res.json(cardsArray))
        .catch(err => res.status(400).json("Error fetching cards: 1"))
};

export const handleGetDeckPracticeSettings = (req, res, db) => {
    const { deckId } = req.params;
    db.select([
        "deckId",
	    "definitionFirst",
	    "practiceDeckPercentage",
	    "termLanguageCode",
	    "termLanguageName",
	    "definitionLanguageCode" ,
	    "definitionLanguageName" ,
	    "readOutOnFlip"
    ]).from('deck_settings').where({deckId})
        .then(settings => res.json(settings[0]))
        .catch(err => res.status(400).json("Error fetching practice settings: 1"))}

      