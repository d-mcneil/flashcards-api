const validateInput = (username, password) => {
    if (!username || !password){
        res.status(400).json("Incorrect form submission: all fields are required.");
        return false;
    } else if (username.length > 100) {
        res.status(400).json("Invalid combination of username and password");
        return false;
    }
    return true;
}

const handleSignIn = (req, res, db, bcrypt) => {
    const { username, password } = req.body;
    const valid = validateInput(username, password);
    if (!valid) {
        return;
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
                .catch(err => res.status(400).json('Error signing in user: 1'));
            } else {
                res.status(400).json("Invalid combination of username and password");
            }
        }).catch(err => res.status(400).json("Error signing in user: 2"));   
};

export default handleSignIn;
