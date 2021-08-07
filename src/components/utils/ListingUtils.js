const serverDomain = process.env.REACT_APP_SERVER_DOMAIN;

export async function doesExist(link) {
    try {
        let response = await fetch(`${serverDomain}/listing/doesExist`, {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            body: JSON.stringify({ link }),
            headers: {
                "Content-type": "application/json",
            },
        });

        return response.json();
    } catch (err) {
        console.log(err);
    }
}

export async function createListing(
    link,
    auth0Id,
    name = "",
    imageURL = "",
    message = "",
    tag = ""
) {
    try {
        let response = await fetch(`${serverDomain}/listing/addListing`, {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            body: JSON.stringify({
                link,
                name,
                imageURL,
                tag,
                auth0Id,
                message,
            }),
            headers: {
                "Content-type": "application/json",
            },
        });

        return response.json();
    } catch (err) {
        console.log(err);
    }
}

export async function getNewListings(limit, skip) {
    try {
        let response = await fetch(
            `${serverDomain}/listing/newListings/${limit}/${skip}`
        );
        return response.json();
    } catch (err) {
        console.log("ERROR GETTING USER ", err);
    }
}

export async function getListingsData(listingIds) {
    try {
        let response = await fetch(`${serverDomain}/listing/getListingsData`, {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            body: JSON.stringify({ listings: listingIds }),
            headers: {
                "Content-type": "application/json",
            },
        });

        return response.json();
    } catch (err) {
        console.log(err);
    }
}
