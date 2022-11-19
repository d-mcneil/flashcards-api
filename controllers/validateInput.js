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

export const validateDeckSettings = (requestBody) => {
    const validateBoolean = (userInput) => {
        if (typeof userInput !== 'boolean') {
            return false;
        }
        return userInput;
    };

    const validatePracticeDeckPercentage = (userInput) => {
        if (typeof userInput !== 'number'){
            return 100;
        } else if (userInput < 1) {
            return 1;
        } else if (userInput > 100) {
            return 100;
        }
        return Math.round(userInput);
    };

    const validateLanguageCode = (userInput) => {
        if (typeof userInput !== 'string'){
            return 'en-US';
        } else if (userInput.length !== 5) {
            return 'en-US';
        }
        return userInput;
    };
    
    const validateLanguageName = (userInput) => {
        if (typeof userInput !== 'string'){
            return "Google US English";
        } else if (userInput.length > 100) {
            return "Google US English";
        }
        return userInput;
    };
    
    const definitionFirst = validateBoolean(requestBody.definitionFirst);
    const practiceDeckPercentage = validatePracticeDeckPercentage(requestBody.practiceDeckPercentage);
    const termLanguageCode = validateLanguageCode(requestBody.termLanguageCode);
    const termLanguageName = validateLanguageName(requestBody.termLanguageName);
    const definitionLanguageCode = validateLanguageCode(requestBody.definitionLanguageCode);
    const definitionLanguageName = validateLanguageName(requestBody.definitionLanguageName);
    const readOutOnFlip = validateBoolean(requestBody.readOutOnFlip);

    return {
        definitionFirst, 
        practiceDeckPercentage, 
        termLanguageCode, 
        termLanguageName, 
        definitionLanguageCode, 
        definitionLanguageName, 
        readOutOnFlip
    };
}
