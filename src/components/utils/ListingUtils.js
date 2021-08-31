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
        console.log("ERROR CHECKING IF LISTING EXISTS ", err);
    }
}

export async function createListing(
    link,
    auth0Id,
    name = "",
    imageAddresses = [],
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
                imageAddresses,
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
        console.log("ERROR CREATING LISTING ", err);
    }
}

export async function getNewListings(limit, skip) {
    try {
        let response = await fetch(
            `${serverDomain}/listing/newListings/${limit}/${skip}`
        );
        return response.json();
    } catch (err) {
        console.log("ERROR GETTING NEW LISTINGS ", err);
    }
}

export async function getMyListings(auth0Id) {
    try {
        let response = await fetch(
            `${serverDomain}/user/${auth0Id}/getMyListings`
        );
        return response.json();
    } catch (err) {
        console.log("ERROR GETTING MY LISTINGS ", err);
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
        console.log("ERROR GETTING LISTINGS DATA ", err);
    }
}

export async function getListing(listingId) {
    try {
        let response = await fetch(
            `${serverDomain}/listing/getListing/${listingId}`
        );
        return response.json();
    } catch (err) {
        console.log("ERROR GETTING LISTING ", err);
    }
}

export async function addListingToHaul(auth0Id, haulId, listingId) {
    try {
        let response = await fetch(
            `${serverDomain}/haul/${auth0Id}/addToHaul/${haulId}/${listingId}`
        );
        return response.json();
    } catch (err) {
        console.log("ERROR ADDING LISTING TO HAUL ", err);
    }
}

export async function removeListingFromHaul(auth0Id, haulId, listingId) {
    try {
        let response = await fetch(
            `${serverDomain}/haul/${auth0Id}/removeFromHaul/${haulId}/${listingId}`
        );
        return response.json();
    } catch (err) {
        console.log("ERROR REMOVING LISTING FROM HAUL ", err);
    }
}

export async function deleteListing(listingId, auth0Id) {
    try {
        let response = await fetch(
            `${serverDomain}/listing/deleteListing/${listingId}/${auth0Id}`
        );
        return response.json();
    } catch (err) {
        console.log("ERROR DELETING LISTING ", err);
    }
}

export async function editListing(listingId, newListing) {
    try {
        let response = await fetch(
            `${serverDomain}/listing/editListing/${listingId}`,
            {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                body: JSON.stringify(newListing),
                headers: {
                    "Content-type": "application/json",
                },
            }
        );

        return response.json();
    } catch (err) {
        console.log("ERROR EDITING LISTING ", err);
    }
}

export async function addQualityCheck(
    listingId,
    name,
    auth0Id,
    comment,
    rating
) {
    try {
        let response = await fetch(
            `${serverDomain}/listing/createQualityCheck/${listingId}`,
            {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                body: JSON.stringify({ name, auth0Id, comment, rating }),
                headers: {
                    "Content-type": "application/json",
                },
            }
        );

        return response.json();
    } catch (err) {
        console.log("ERROR GETTING USER ", err);
    }
}

export async function deleteComment(listingId, commentId) {
    try {
        let response = await fetch(
            `${serverDomain}/listing/deleteComment/${listingId}/${commentId}`
        );
        return response.json();
    } catch (err) {
        console.log("ERROR DELETING COMMENT", err);
    }
}

export async function flagListing(listingId, auth0Id) {
    try {
        let response = await fetch(
            `${serverDomain}/listing/flagListing/${listingId}/${auth0Id}`
        );
        return response.json();
    } catch (err) {
        console.log("ERROR FLAGGING LISTING ", err);
    }
}

export async function findListings(search) {
    try {
        console.log(search);
        let response = await fetch(
            `${serverDomain}/listing/findListings/${search}`
        );
        return response.json();
    } catch (err) {
        console.log("ERROR FLAGGING LISTING ", err);
    }
}
