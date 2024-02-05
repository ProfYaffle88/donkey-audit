/* UK Parliament API */
const API_URL = "https://members-api.parliament.uk";
const API_SEARCH = "/api/Members/Search";
const API_MEMBERS = "/api/Members"

 /*Find MP ID by search*/
 async function selectMp() {
    // let searchName = new FormData(document.getElementById("checksform"));
    // let searchName = "Mogg"
    const searchString = `${API_URL}${API_SEARCH}?Name=${searchName}`
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

/* Get MP data by /{id}/ */
async function selectMpById(iD) {
    const mpById = `${API_URL}${API_MEMBERS}/${iD}`;
    const response = await fetch(mpById);
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

selectMpById(4099);

/* Display MP data */
function displayData() {

}