export const validateDeckInput = (deckName) => {
    if (!deckName) {
        res.status(400).json("Invalid submission: deck name is required.");
        return false;
    } else if (deckName.length > 100) {
        res.status(400).json("Invalid submission: deck name must be no more than 100 characters long.");
        return false;
    }
    return true;
}

export const validateCardInput = (term, definition) => {
    if (!term || !definition) {
        res.status(400).json("Invalid submission: both term and definition are required.");
        return false;
    } else if (term.length > 255) {
        res.status(400).json("Invalid submission: term must be no more than 255 characters long.");
        return false;
    } else if (definition.length > 255) {
        res.status(400).json("Invalid submission: definition name must be no more than 255 characters long.");
        return false;
    }
    return true;
}

export const validateRegistrationInput = (firstName, lastName, username, email, password) => {
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

export const validateSignInInput = (username, password) => {
    if (!username || !password){
        res.status(400).json("Incorrect form submission: all fields are required.");
        return false;
    } else if (username.length > 100) {
        res.status(400).json("Invalid combination of username and password");
        return false;
    }
    return true;
}