// Comapres two things if they are equal.
// DOES NOT WORK FOR OBJECTS OR ARRAYS
export function isEqual(elem1, elem2) {
    if (elem1 === elem2) return true;
    return false;
}

// Checks if user is undefined before returning the auth0Id
export function getAuth0Id(user) {
    if (user) return user.sub;
    else return null;
}
