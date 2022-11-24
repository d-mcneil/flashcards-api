export const handleDeleteDeck = (req, res, db) => {
    const { userId, secondaryId } = req.body;
    db('decks').where({deckId: secondaryId}).andWhere({userId}).del().returning('deckId')
        .then(deletedDeckId => res.json(deletedDeckId[0]))
        .catch(err => res.status(400).json("Error deleting deck: 1"))
};

export const handleDeleteCard = (req, res, db) => {
    const { userId, secondaryId } = req.body;
    db('cards').where({cardId: secondaryId}).andWhere({userId}).del().returning('cardId')
        .then(deletedCardId => res.json(deletedCardId[0]))
        .catch(err => res.status(400).json("Error deleting card: 1"))
};

export const handleDeleteUser = (req, res, db) => {
    const { userId, secondaryId } = req.body;
    db('users').where({username: secondaryId}).andWhere({userId}).del().returning('userId')
        .then((deletedUserId => res.json(deletedUserId[0])))
        .catch(err => res.status(400).json('Error deleting user: 1'));
};

// this function could handle deleting cards, decks, and users
// but, to me, it seems to be less clear and unnecessarily complicating something that's pretty simple
//
// export default handleDelete = (req, res, db) => {
//     const { databaseName, secondaryColumnName, secondaryColumnValue, userId, returningColumn, cardDeckOrUser } = req.body;
//     db(databaseName).where(secondaryColumnName, secondaryColumnValue).andWhere({userId})
//         .del().returning(returningColumn).then((deletedId => res.json(deletedId[0])))
//         .catch(err => res.status(400).json(`Error deleting ${cardDeckOrUser}: 1`));
// }
