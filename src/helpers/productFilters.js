export function removeProductCategoriesFilter(stringvalue, key, value) {
    let samplekey = stringvalue.slice(1).split('&');
    console.log("samplekey",samplekey);
    samplekey = samplekey.filter(item => {
        let [k, v] = item.split('=');
        console.log("kv",k, v)
        return !(k === key && v === value);
    });

    return '?' + samplekey.join('&');
}

export function updateMinMaxPriceFilter(queryString, paramToUpdate, newValue, paramToUpdate2, newValue2) {
    // Remove leading '?' if present
    queryString = queryString.startsWith('?') ? queryString.substring(1) : queryString;

    // Split the query string into individual parameters
    let queryParams = queryString.split('&');

    // Iterate over each parameter and update the one matching paramToUpdate
    for (let i = 0; i < queryParams.length; i++) {
        let pair = queryParams[i].split('=');
        if (pair[0] === paramToUpdate) {
            pair[1] = newValue;
            queryParams[i] = pair.join('=');
            // break; // Exit loop since parameter is found and updated

        } else if (pair[0] === paramToUpdate2) {
            pair[1] = newValue2;
            queryParams[i] = pair.join('=');
        }
    }

    // Join the parameters back together with '&' and reconstruct the query string
    return queryParams.join('&');
}
