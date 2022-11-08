const validateInput = (firstName, lastName, username, email, password) => {
    if (!firstName || !lastName || !email || !username || !password){
        res.status(400).json("Incorrect form submission: all fields are required.");
        return false;
    } else if (firstName.length > 100) {
        res.status(400).json("Invalid form submission: first name must be no more than 100 characters long.");
        return false;
    } else if (lastName.length > 100) {
        res.status(400).json("Invalid form submission: last name must be no more than 100 characters long.");
        return false;
    } else if (email.length > 100) {
        res.status(400).json("Invalid form submission: email must be no more than 100 characters long.");
        return false;
    } else if (username.length > 100) {
        res.status(400).json("Invalid form submission: username must be no more than 100 characters long.");
        return false;
    } else if (!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        res.status(400).json("Invalid form submission: email is not valid.");
        return false;
    }
    return true;
}

const handleRegister = (req, res, db, bcrypt) => {
    const { firstName, lastName, username, email, password } = req.body;
    const valid = validateInput(firstName, lastName, username, email, password);
    if (!valid) {
        return;
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
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    email: email,
                    joined: new Date()
                  }).returning('*')
                  .then(user => 
                    trx('login').insert({
                      userId: user[0].userId,
                      username: username,
                      hash: hash
                    }).then(() => res.json(user[0]))
                  ).then(trx.commit).catch(trx.rollback);
                }).catch(err => res.status(400).json("Error registering new user: 1"));
              } else {
                res.status(400).json("Error registering new user: 2");
              }
            });
          } else {
            res.status(400).json("Error registering new user: 3")
          }
        });
      }
    }).catch(err => res.status(400).json("Error registering new user: 4"));  
  };
  
  export default handleRegister;
  