const handleSignIn = (req, res, db, bcrypt) => {
    const { username, password } = req.body;
    if (!username || !password){
        return res.status(400).json("Incorrect form submission: all fields required")
    }
    db.select('hash').from('login').where({username})
        .then(data => {
        if (data.length){
            return bcrypt.compare(password, data[0].hash);
        } else {
            return false;
        }
        }).then(isValidPassword => {
            if (isValidPassword) {
                db.select('*').from('users').where({username}).then(user => res.json(user[0]))
                .catch(err => res.status(400).json('Error fetching user information'));

            } else {
                res.status(400).json("Invalid combination of username and password");
            }
        }).catch(err => res.status(400).json("Error logging in user: 1"));   
};

export default handleSignIn;
