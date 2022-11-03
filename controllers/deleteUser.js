const handleDeleteUser = (req, res, db) => {
    const { username } = req.body;
    db('users').where({username}).del().returning('user_id')
        .then((deletedUserId => res.json(deletedUserId[0].user_id)))
        .catch(err => res.status(400).json('Error deleting user: 0'));
};

export default handleDeleteUser;
