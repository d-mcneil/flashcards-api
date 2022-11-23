import { validateDeckInput, validateDeckSettings } from "./validateInput.js";

export const handleUpdateDeck = (req, res, db) => {
    const { userId, secondaryId, primaryColumn, secondaryColumn } = req.body;
    const deckId = secondaryId;
    const deckName = primaryColumn;
    const description = secondaryColumn;
    const valid = validateDeckInput(deckName);
    if (!valid) {
        return;
    }
    db('decks').where({deckId}).andWhere({userId})
        .update({deckName, description})
        .returning('deckId').then(deckId => res.json(deckId[0]))
        .catch(err => res.status(400).json("Error updating deck: 1"));
}

export const handleUpdateDeckSettings = (req, res, db) => {
    const { userId, deckId } = req.body;
    const validatedSettings = validateDeckSettings(req.body)
    const { 
        definitionFirst, 
        practiceDeckPercentage, 
        termLanguageCode, 
        termLanguageName, 
        definitionLanguageCode, 
        definitionLanguageName, 
        readOutOnFlip
    } = validatedSettings;

    db('deck_settings').where({deckId}).andWhere({userId})
    .update({
        definitionFirst, 
        practiceDeckPercentage, 
        termLanguageCode, 
        termLanguageName, 
        definitionLanguageCode, 
        definitionLanguageName, 
        readOutOnFlip
    })
    .returning([
        "deckId",
	    "definitionFirst",
	    "practiceDeckPercentage",
	    "termLanguageCode",
	    "termLanguageName",
	    "definitionLanguageCode" ,
	    "definitionLanguageName" ,
	    "readOutOnFlip"
    ]).then(settings => res.json(settings[0]))
    .catch(err => res.status(400).json("Error saving updated deck settings: 1"));
}