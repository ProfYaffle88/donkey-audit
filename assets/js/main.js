/* UK Parliament API */
const API_URL = "https://members-api.parliament.uk";
const API_SEARCH = "/api/Members/Search";
const API_MEMBERS = "/api/Members"

// Function to update the dropdown with MP names from HTML collection
function updateMpNameDropdown(data) {
    const dropdownContainer = document.getElementById("searchMpNameDropdown");
    dropdownContainer.innerHTML = ""; // Clear previous dropdown items

    // Extract MP items from the JSON data
    const mpItems = data.items;

    // Iterate over MP items
    mpItems.forEach(item => {
        // Extract the name from the item
        const name = item.value.nameListAs;

        // Create an option element for the dropdown
        const option = document.createElement("a");
        option.textContent = name;
        option.onclick = () => {
            // When the user clicks on an option, fill the input with the selected name
            document.getElementById("searchMpNameInput").value = name;
            // Optionally, you can trigger a search or any other action here
        };

        // Append the option to the dropdown container
        dropdownContainer.appendChild(option);
    });

    // Show the dropdown
    dropdownContainer.style.display = "block";
}


// Function called when user types in the search input for MP name
async function searchMpName() {
    const searchTerm = document.getElementById("searchMpNameInput").value;
    if (searchTerm.length < 3) {
        // Don't search until the user enters at least 3 characters
        return;
    }

    const searchString = `${API_URL}${API_SEARCH}?Name=${searchTerm}&skip=0&take=20`;
    const response = await fetch(searchString);
    const data = await response.json();

    if (response.ok) {
        updateMpNameDropdown(data);
    } else {
        console.log(data);
        // Handle error
    }
}


/* Display MP data */
function displayData() {

}