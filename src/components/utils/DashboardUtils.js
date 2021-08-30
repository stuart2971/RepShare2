const serverDomain = process.env.REACT_APP_SERVER_DOMAIN;

export async function getDashboardData(auth0Id) {
    try {
        let response = await fetch(
            `${serverDomain}/user/${auth0Id}/getDashboardData`
        );
        return response.json();
    } catch (err) {
        console.log("ERROR GETTING DASHBOARD DATA ", err);
    }
}

export async function getHaulsData(auth0Id) {
    try {
        let response = await fetch(
            `${serverDomain}/haul/${auth0Id}/getHaulsData`
        );
        return response.json();
    } catch (err) {
        console.log("ERROR GETTING HAULS DATA ", err);
    }
}

export async function createHaul(auth0Id, haulName) {
    try {
        let response = await fetch(
            `${serverDomain}/haul/${auth0Id}/createHaul/${haulName}`
        );
        return response.json();
    } catch (err) {
        console.log("ERROR CREATING HAUL ", err);
    }
}

export async function removeHaul(auth0Id, haulId) {
    try {
        let response = await fetch(
            `${serverDomain}/haul/${auth0Id}/removeHaul/${haulId}`
        );

        return response.json();
    } catch (err) {
        console.log("ERROR REMOVING HAUL ", err);
    }
}

export async function getHaul(auth0Id, haulId) {
    try {
        let response = await fetch(
            `${serverDomain}/haul/${auth0Id}/getHaul/${haulId}`
        );

        return response.json();
    } catch (err) {
        console.log("ERROR GETTING HAUL ", err);
    }
}

export async function changeHaulName(auth0Id, haulId, newHaulName) {
    try {
        let response = await fetch(
            `${serverDomain}/haul/${auth0Id}/changeHaulName/${haulId}/${newHaulName}`
        );

        return response.json();
    } catch (err) {
        console.log("ERROR GETTING HAUL ", err);
    }
}

export function calculateTotalHaulItems(haulsData) {
    let total = 0;
    for (let i = 0; i < haulsData.length; i++) {
        total += haulsData[i].listingSize;
    }
    return total;
}
