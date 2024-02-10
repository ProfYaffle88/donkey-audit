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
            // Hide the dropdown
            dropdownContainer.style.display = "none";
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


// Function to display MP data in the main content section
function displayData(mpData) {
    // Hide all current elements in the main content section
    const contentSections = document.querySelectorAll('main .content');
    contentSections.forEach(section => {
        section.style.display = 'none';
    });

    // Create a new section for displaying MP data
    const mpSection = document.createElement('section');
    mpSection.className = 'content';

    // Create elements to display MP data
    const mpNameElement = document.createElement('h2');
    mpNameElement.textContent = mpData.value.nameListAs;
    console.log(mpNameElement.textContent);

    const mpPortraitElement = document.createElement('img');
    mpPortraitElement.src = mpData.value.thumbnailUrl;
    mpPortraitElement.alt = "MP Portrait";
    console.log(mpPortraitElement.src);

    // Assuming mpBio, mpContactInfo, mpRegisterOfInterests, votingRecord, and lastElectionResult
    // are properties of mpData, you can create corresponding elements for each of them

    // Append elements to the MP section
    mpSection.appendChild(mpNameElement);
    mpSection.appendChild(mpPortraitElement);
    // Append more elements as needed

    // Append the MP section to the main content
    document.querySelector('main').appendChild(mpSection);
}
