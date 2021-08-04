const serverDomain = process.env.REACT_APP_SERVER_DOMAIN;

export async function getUser(auth0Id, name) {
    try {
        let response = await fetch(
            `${serverDomain}/user/${auth0Id}/getUser/${name}`
        );
        return response.json();
    } catch (err) {
        console.log("ERROR GETTING USER ", err);
    }
}
