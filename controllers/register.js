import { validateRegistrationInput } from "./validateInput.js";

const handleRegister = (req, res, db, bcrypt) => {
    const { firstName, lastName, username, email, password } = req.body;
    const valid = validateRegistrationInput(firstName, lastName, username, email, password);
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
                    firstName,
                    lastName,
                    username,
                    email,
                    joined: new Date()
                  }).returning('*')
                  .then(user => 
                    trx('login').insert({
                      userId: user[0].userId,
                      username,
                      hash
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
  