/* UK Parliament API */
const API_URL = "https://members-api.parliament.uk";
const API_SEARCH = "/api/Members/Search";
const API_MEMBERS = "/api/Members";
let mpData = "";

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
        let mpInfo = {
            id: mpData.id,
            name: mpData.nameDisplayAs,
            portrait: mpData.thumbnailUrl,
            synopsis: "",
            contactInfo: [],
            registeredInterests: [],
            voting: [],
            lastElectionRes: {
                electionTitle: "",
                electionDate: "",
                constituencyName: "",
                result: "",
                electorate: "",
                turnout: "",
                majority: ""
            }
            // Add more key-value pairs as needed
        };

        try {
            // Fetch Synopsis
            // Short text string with anchor elements 
            const synopsisResponse = await fetch(`${API_URL}${API_MEMBERS}/${mpInfo.id}/Synopsis`);
            const synopsisData = await synopsisResponse.json();
            console.log("Synopsis Data:")
            console.log(synopsisData);
            if (synopsisResponse.ok) {
                mpInfo.synopsis = synopsisData.value.innerHtml;
            } else {
                throw new Error(synopsisData.error);
            }

            // Fetch Contact Info
            // Add contact to mpInfo as data.value (an array of two objects; offices postal address and website addresses.)
            const contactResponse = await fetch(`${API_URL}${API_MEMBERS}/${mpInfo.id}/Contact`);
            const contactData = await contactResponse.json();
            console.log("Contact Data:");
            console.log(contactData);
            if (contactResponse.ok) {
                mpInfo.contactInfo = contactData.value;
            } else {
                throw new Error(contactData.error);
            }

            // Fetch Registered Interests
            // add regIntersts to mpInfo as data.value (a potenitally large array!)
            const interestsResponse = await fetch(`${API_URL}${API_MEMBERS}/${mpInfo.id}/RegisteredInterests`);
            const interestsData = await interestsResponse.json();
            console.log("Interests Data:");
            console.log(interestsData);
            if (interestsResponse.ok) {
                mpInfo.registeredInterests = interestsData.value;
            } else {
                throw new Error(interestsData.error);
            }

            // Voting has an additional required parameter
            
            // [https://members-api.parliament.uk/api/Members/4099/Voting?house=1 or 2] ... depending if in commons or lords - as it stands, only works for commons MPs, need to add somesothing for lords!
            searchString = `${API_URL}${API_MEMBERS}/${mpInfo.id}/Voting?house=1`;
            const votingResponse = await fetch(searchString);
            const votingData = await votingResponse.json();
            console.log("Voting Data:");
            console.log(votingData);

            if (response.ok) {
                mpInfo.voting = votingData.value;
            } else {
                throw new Error(data.error);
            }
            
            // Latest Election Result requires some data handling to display later on

            searchString = `${API_URL}${API_MEMBERS}/${mpInfo.id}/LatestElectionResult`;
            const elecResResponse = await fetch(searchString);
            const elecResData = await elecResResponse.json();
            console.log("Election Result Data:");
            console.log(elecResData);

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
    // Remove hide from search again button
    document.getElementById('search-again').classList.remove('hide');
    // Hide all current elements in the main content section
    const contentSections = document.querySelectorAll('main .content');
    contentSections.forEach(section => {
        section.style.display = 'none';
    });

    // Create a new section for displaying MP data
    const mpSection = document.createElement('section');
    mpSection.className = 'results';

    // Create elements to display MP data
    const mpNameElement = document.createElement('h1');
    mpNameElement.textContent = mpInfo.name;
    console.log(mpNameElement.textContent);

    // Create a line break element
    const lineBreak = document.createElement('br');

    // Append the line break after the mpNameElement
    mpNameElement.insertAdjacentElement('afterend', lineBreak);

    const mpPortraitElement = document.createElement('img');
    mpPortraitElement.src = mpInfo.portrait;
    mpPortraitElement.alt = "MP Portrait";
    mpPortraitElement.insertAdjacentElement('afterend', lineBreak);

    // Synopsis data
    const mpSynopsisElement = document.createElement('p');
    mpSynopsisElement.innerHtml = mpInfo.synopsis;
    mpSynopsisElement.insertAdjacentElement('afterend', lineBreak); 

    // Display contact information
    const mpContactInfoElement = document.createElement('p');
    mpContactInfoElement.textContent = "Contact Information:";
    mpInfo.contactInfo.forEach(contact => {
        const contactDetail = document.createElement('p');
        contactDetail.textContent = `${contact.type}: ${contact.address}`;
        mpContactInfoElement.appendChild(contactDetail);
    });
    mpContactInfoElement.insertAdjacentElement('afterend', lineBreak);

    // Display registered interests
    const mpRegisteredInterestsElement = document.createElement('p');
    mpRegisteredInterestsElement.textContent = "Registered Interests:";
    mpInfo.registeredInterests.forEach(interest => {
        const interestDetail = document.createElement('p');
        interestDetail.textContent = interest;
        mpRegisteredInterestsElement.appendChild(interestDetail);
    });
    mpRegisteredInterestsElement.insertAdjacentElement('afterend', lineBreak);

    // Display voting data
    const mpVotingElement = document.createElement('p');
    mpVotingElement.textContent = "Voting Data:";
    mpInfo.voting.forEach(vote => {
        const voteDetail = document.createElement('p');
        voteDetail.textContent = `${vote.question}: ${vote.answer}`;
        mpVotingElement.appendChild(voteDetail);
    });
    mpVotingElement.insertAdjacentElement('afterend', lineBreak);

    // Display latest election result
    const mpElectionResultElement = document.createElement('p');
    mpElectionResultElement.textContent = "Latest Election Result:";
    const electionResultDetail = document.createElement('p');
    electionResultDetail.textContent = `Election Title: ${mpInfo.lastElectionRes.electionTitle}`;
    mpElectionResultElement.appendChild(electionResultDetail);
    const electionDateDetail = document.createElement('p');
    electionDateDetail.textContent = `Election Date: ${mpInfo.lastElectionRes.electionDate}`;
    mpElectionResultElement.appendChild(electionDateDetail);
    const constituencyNameDetail = document.createElement('p');
    constituencyNameDetail.textContent = `Constituency Name: ${mpInfo.lastElectionRes.constituencyName}`;
    mpElectionResultElement.appendChild(constituencyNameDetail);
    const resultDetail = document.createElement('p');
    resultDetail.textContent = `Result: ${mpInfo.lastElectionRes.result}`;
    mpElectionResultElement.appendChild(resultDetail);
    const electorateDetail = document.createElement('p');
    electorateDetail.textContent = `Electorate: ${mpInfo.lastElectionRes.electorate}`;
    mpElectionResultElement.appendChild(electorateDetail);
    const turnoutDetail = document.createElement('p');
    turnoutDetail.textContent = `Turnout: ${mpInfo.lastElectionRes.turnout}`;
    mpElectionResultElement.appendChild(turnoutDetail);
    const majorityDetail = document.createElement('p');
    majorityDetail.textContent = `Majority: ${mpInfo.lastElectionRes.majority}`;
    mpElectionResultElement.appendChild(majorityDetail);

    mpElectionResultElement.insertAdjacentElement('afterend', lineBreak);


    // Append elements to the MP section
    mpSection.appendChild(mpNameElement);
    mpSection.appendChild(mpPortraitElement);
    mpSection.appendChild(mpSynopsisElement);
    mpSection.appendChild(mpContactInfoElement);
    mpSection.appendChild(mpRegisteredInterestsElement);
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
