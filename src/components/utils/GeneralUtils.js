// Checks if user is undefined before returning the auth0Id
export function getAuth0Id(user) {
    if (user) return user.sub;
    else return null;
}
