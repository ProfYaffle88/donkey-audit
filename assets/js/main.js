/* UK Parliament API */
const API_URL = "https://members-api.parliament.uk";
const API_SEARCH = "/api/Members/Search";
const API_MEMBERS = "/api/Members"
let mpData;

// Function to update the dropdown with MP names from HTML collection
function updateMpNameDropdown(data) {
    const dropdownContainer = document.getElementById("searchMpNameDropdown");
    dropdownContainer.innerHTML = ""; // Clear previous dropdown items

    // Extract MP items from the JSON data
    const mpItems = data.items;

    // Iterate over MP items
    mpItems.forEach(item => {
        // Extract the name from the item
        const name = item.value.nameDisplayAs;

        // Create an option element for the dropdown
        const option = document.createElement("a");
        option.textContent = name;
        option.onclick = () => {
            // Remove the .selected class from previously selected options
            const selectedOption = dropdownContainer.querySelector(".selected");
            if (selectedOption) {
                selectedOption.classList.remove("selected");
            }
            // Add the .selected class to the clicked option
            option.classList.add("selected");

            // When the user clicks on an option, fill the input with the selected name
            document.getElementById("searchMpNameInput").value = name;
           
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

    const searchString = `${API_URL}${API_SEARCH}?Name=${searchTerm}&skip=0&take=15`;
    const response = await fetch(searchString);
    const data = await response.json();

    if (response.ok) {
        updateMpNameDropdown(data);
    } else {
        console.log(data);
    }
}

// Function called when the submit button is clicked
async function handleSubmit() {
    // Selected Name
    const selectedMpOption = document.querySelector("#searchMpNameDropdown .selected");
    console.log(selectedMpOption);
    const selectedMpName = selectedMpOption ? selectedMpOption.innerText.trim() : "";
    console.log(selectedMpName);

    // Check if an MP name is selected
    if (!selectedMpName || selectedMpName === '') {
        // Highlight the dropdown input element briefly
        const searchMpNameInput = document.getElementById("searchMpNameInput");
        searchMpNameInput.classList.add("is-invalid");
        setTimeout(() => {
            searchMpNameInput.classList.remove("is-invalid");
        }, 2000); // Remove the highlight after 2 seconds
        return;
    }

    // Fetch additional data based on the selected MP name
    try {
        // Fetch MP data by name
        mpData = await fullMpDataByName(selectedMpName);
        // Display the MP data
        displayData(mpData);
    } catch (error) {
        console.error("Error fetching MP data:", error);
        // Handle error
    }
}

// Function to fetch MP data by name
async function fullMpDataByName(selectedMpName) {
    const searchString = `${API_URL}${API_SEARCH}?Name=${selectedMpName}`;
    const response = await fetch(searchString);
    let data = await response.json();

    if (response.ok) {
        // Assuming we return the first MP data if multiple results are returned
        console.log("API Response Data:", data);
        console.log("API Response Items:", data.items);
        mpData = data.items[0].value;
        // Extract relevant data and store in a new object
        const mpInfo = {
            id: mpData.id,
            name: mpData.nameListAs,
            portrait: mpData.thumbnailUrl
            // Add more key-value pairs as needed
        };

        try {
            // Fetch Synopsis
            // Short text string with anchor elements 
            const synopsisResponse = await fetch(`https://members-api.parliament.uk/api/Members/${mpInfo.id}/Synopsis`);
            const synopsisData = await synopsisResponse.json();
            if (synopsisResponse.ok) {
                mpInfo.synopsis = synopsisData.value.innerHtml;
            } else {
                throw new Error(synopsisData.error);
            }

            // Fetch Contact Info
            // Add contact to mpInfo as data.value (an array of two objects; offices postal address and website addresses.)
            const contactResponse = await fetch(`https://members-api.parliament.uk/api/Members/${mpInfo.id}/Contact`);
            const contactData = await contactResponse.json();
            if (contactResponse.ok) {
                mpInfo.contactInfo = contactData.value;
            } else {
                throw new Error(contactData.error);
            }

            // Fetch Registered Interests
            // add regIntersts to mpInfo as data.value (a potenitally large array!)
            const interestsResponse = await fetch(`https://members-api.parliament.uk/api/Members/${mpInfo.id}/RegisteredInterests`);
            const interestsData = await interestsResponse.json();
            if (interestsResponse.ok) {
                mpInfo.registeredInterests = interestsData.value;
            } else {
                throw new Error(interestsData.error);
            }

            /* Here be Dragons -

            Voting has an additional required parameter
            Latest Election Result requires some data handling to display later on

            // [https://members-api.parliament.uk/api/Members/4099/Voting?house=1 or 2] ... depending if in governemnt or not needs a check to work!
            searchString = `https://members-api.parliament.uk/api/Members/${mpInfo.id}/Voting?house=1`;
            const votingResponse = await fetch(searchString);
            const votingData = await response.json();

            if (response.ok) {
                // add voting to mpInfo
            } else {
                throw new Error(data.error);
            }

            searchString = `https://members-api.parliament.uk/api/Members/${mpInfo.id}/LatestElectionResult`;
            const elecResResponse = await fetch(searchString);
            const elecResData = await response.json();

            if (response.ok) {
                // add lastElectionRes to mpInfo (this is an object to 7 key value pairs; electionTitle, electionDate, constituencyName, result, electorate, turnout, majority)
                mpInfo.lastElectionRes.electionTitle = elecResData.value.electionTitle;
                mpInfo.lastElectionRes.electionDate = elecResData.value.electionDate;
                mpInfo.lastElectionRes.constituencyName = elecResData.value.constituencyName;
                mpInfo.lastElectionRes.result = elecResData.value.result;
                mpInfo.lastElectionRes.electorate = elecResData.value.electorate;
                mpInfo.lastElectionRes.turnout = elecResData.value.turnout;
                mpInfo.lastElectionRes.majority = elecResData.value.majority;
            } else {
                throw new Error(data.error);
            }

            */
            
        } catch (error) {
            console.error("Error fetching additional MP data:", error);
            // Handle error
        }

        return mpInfo;

    } else {
        throw new Error(data.error);
    }
}

// Function to display MP data in the main content section
function displayData(mpInfo) {
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
    mpNameElement.textContent = mpInfo.value.nameListAs;
    console.log(mpNameElement.textContent);

    const mpPortraitElement = document.createElement('img');
    mpPortraitElement.src = mpInfo.value.thumbnailUrl;
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

/* EVENT LISTENERS */

// Eventvent listener to the submit button
document.querySelector(".submit").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    handleSubmit(); // Call the handleSubmit function
});
