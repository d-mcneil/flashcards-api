const handleDeleteCard = (req, res, db) => {
    const { cardId, userId } = req.body;
    db('cards').where({card_id:cardId}).andWhere({user_id:userId}).del().returning('card_id')
        .then(deletedCardId => res.json(deletedCardId[0]))
        .catch(err => res.status(400).json("Error deleting card: 1"))
};

export default handleDeleteCard;
