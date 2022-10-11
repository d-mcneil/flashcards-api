const handleRegister = (req, res, db, bcrypt) => {
  const { email, username, password } = req.body;
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  if (!firstName || !lastName || !email || !username || !password){
      return res.status(400).json("Incorrect form submission: all fields are required");
  } else if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
    return res.status(400).json("Incorrect form submission: invalid email");
  }
  db.select('username').from('users').where({username}).then(array => {
    if (array.length) {
      return res.status(400).json("Username is already being used; select another username.");
    } else {
      bcrypt.genSalt(10, function(err, salt) {
        if (!err) {
          bcrypt.hash(password, salt, function(err, hash) {
            if (!err) {
              db.transaction(trx => {
                trx('users').insert({
                  first_name: firstName,
                  last_name: lastName,
                  username: username,
                  email: email,
                  joined: new Date()
                }).returning('*').then(user => 
                  trx('login').insert({
                    user_id: user[0].user_id,
                    username: username,
                    email: email,
                    hash: hash
                  }).then(() => res.json(user[0]))
                ).then(trx.commit).catch(trx.rollback);
              }).catch(err => res.status(400).json("Unable to register new user: 1"));
            } else {
              res.status(400).json("Unable to register new user: 2");
            }
          });
        } else {
          res.status(400).json("Unable to register new user: 3")
        }
      });
    }
  }).catch(err => res.status(400).json("Unable to register new user: 4"));  
};

export default handleRegister;
