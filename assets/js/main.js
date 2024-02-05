/* UK Parliament API */
const API_URL = "https://members-api.parliament.uk"
const API_SEARCH = "/api/Members/Search"

 /*Find MP ID by search*/
 async function selectMp() {
    // let searchName = new FormData(document.getElementById("checksform"));
    let searchName = "Jacob Rees Mogg"
    const searchString = `${API_URL}${API_SEARCH}`
    const response = await fetch(searchString);
    const data = await response.json();

    if (response.ok) {
        console.log(data);
        displayData(data);
    } else {
        console.log(data);
        displayException(data);
        throw new Error(data.error);
    }
}
selectMp();
/* Get MP data by /{id}/ */



/* Display MP data */