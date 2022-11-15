export const validateDeckName = (deckName) => {
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
