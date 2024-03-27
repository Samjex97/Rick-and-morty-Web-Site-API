
//  ELEMENTS

var image = document.querySelector(".containerImage"); //Section where I search for elements and give them a variable
var status = document.querySelector(".status"); //Section where I search for elements and give them a variable
var name = document.querySelector(".name");//Section where I search for elements and give them a variable
var race = document.querySelector(".Race"); //Section where I search for elements and give them a variable
var gender = document.querySelector(".Gender"); //Section where I search for elements and give them a variable
var card = document.querySelector("Card"); //Section where I search for elements and give them a variable
var buttons = document.querySelectorAll(".Buttons"); //Section where I search for elements and give them a variable
var content = document.querySelector(".content"); //Section where I search for elements and give them a variable
var CardSelector = document.querySelector('.CardSelector'); //Section where I search for elements and give them a variable
var Section3H1 = document.querySelector('.Section3H1'); //Section where I search for elements and give them a variable




// BUTTON FUNCTION TO GET ALL STATUS AND CARD ELEMENT BY CLICKING IT
buttons.forEach(button => {
    button.addEventListener("click", async function () {
        content.classList.add("fade-out"); //Fade out effect when i click on the button 
        CardSelector.classList.add("fade-in"); // Fade in effect when i click on the button 
        setTimeout(function () {  // Set a Time Out function to give some delay disappearance for content class 
            content.style.display = "none";
        }, 1000);
        const status = button.dataset.status;  // Finding data from the api and setting it with a variable
        showCards(); // Showing card function declared 
        try {
            let characters;  //  Trying to filter Characters by status or All 
            if (status !== 'all') {
                characters = await getCharactersByStatus(status);
            } else {
                characters = await getAllCharacters();
            }

            CharCard(characters);
        } catch (error) {
            console.error('Error fetching characters:', error);  // If we have Errors 
        }
    });
});
// TO GET ALL STATUS FROM ALL PAGES OF THE API
async function getCharactersByStatus(status) {  // function to get character from th API
    const response = await fetch(`https://rickandmortyapi.com/api/character/?status=${status}`);  // searching API with link 
    const data = await response.json(); // Creating data variable 
    return data.results;  // Return data result 
}
// TO GET ALL CHARACTERS FROM ALL PAGES OF THE API
async function getAllCharacters() {    // function to get  ALL character from the API
    let allCharacters = [];    // All char Array
    let page = 1;  // setting the first page loaded 

    try {
        let nextPage = `https://rickandmortyapi.com/api/character?page=${page}`;  // searching next page with the API
        do {
            const response = await fetch(nextPage); //feching API with Variable nextPage
            const data = await response.json();  // getting datas
            const characters = data.results; // giving datas to Variable
            allCharacters = allCharacters.concat(characters); // Using concat function to get all characters 
            nextPage = data.info.next;
        } while (nextPage !== null);
    } catch (error) {
        console.error('Error fetching characters:', error);  // If we have Errors 
    }

    return allCharacters;
}
// CARD IMAGE AND DESCRIPTION
function CharCard(characters) {  // Filling card section
    var cardContainers = document.querySelectorAll(".Card");  // find the card section and use it as a container
    cardContainers.forEach((cardContainer) => {  // For all card container i use... 
        var character = characters[Math.floor(Math.random() * characters.length)]; // random number to find random char 
        if (!character) {
            cardContainer.style.display = 'none';
            return;
        }

        var imageContainer = cardContainer.querySelector(".containerImage");   //Section where I search for elements and give them a variable
        var statusElement = cardContainer.querySelector(".status"); //Section where I search for elements and give them a variable
        var nameElement = cardContainer.querySelector(".name");//Section where I search for elements and give them a variable
        var raceElement = cardContainer.querySelector(".Race");//Section where I search for elements and give them a variable
        var genderElement = cardContainer.querySelector(".Gender");//Section where I search for elements and give them a variable

        imageContainer.style.backgroundImage = `url('${character.image}')`; //Section where I put image background
        imageContainer.style.backgroundSize = "cover";  // using css in javascript to cover all the section choosed for the background
        imageContainer.style.backgroundPosition = "center"; // using css in javascript to center the background image in the section choosed

        statusElement.textContent = `Status: ${character.status}`; // insert content to see status 
        nameElement.textContent = `Name: ${character.name}`;  // insert content to see name
        raceElement.textContent = `Race: ${character.species}`; // insert content to see species
        genderElement.textContent = `Gender: ${character.gender}`;  // insert content to see gender

        cardContainer.addEventListener("click", function () {
            showModale(character);   // calling function to open modale by cliking card 
        });
    });
}
// Show CARDS
function showCards() {
    const cards = document.querySelectorAll('.Card'); //Section where I search for elements and give them a variable
    var Section3H1 = document.querySelector('.Section3H1'); //Section where I search for elements and give them a variable
    var Section3 = document.querySelector('.Section3'); //Section where I search for elements and give them a variable
    var MoveButton = document.querySelector('.MoveButton'); //Section where I search for elements and give them a variable
 
    cards.forEach(card => {
        card.style.display = 'block'; // using css in javascript to change display value
        Section3H1.style.display = 'none'; // using css in javascript to change display value
        Section3.style.display = 'block'; // using css in javascript to change display value
        MoveButton.style.display = 'none'; // using css in javascript to change display value
    });
}

function showModale(character) {  // open modale function
    var modale = document.getElementById('modale'); //Section where I search for elements and give them a variable
    var locationElement = modale.querySelector('.location'); //Section where I search for elements and give them a variable
    var episodeElement = modale.querySelector('.episode'); //Section where I search for elements and give them a variable
    var imageContainer2 = document.querySelector(".containerImageModale"); //Section where I search for elements and give them a variable

    if (character && character.image && character.episode && character.episode.length > 0) {  //giving parameters to if 
        // Extract episode number from the pages
        var episodeNumber = character.episode[0].split('/').pop(); // splitting and using pop method to find the correct char episode 
        locationElement.textContent = character.location.name; // insert content to see location name
        episodeElement.textContent =  episodeNumber;  // insert content to see episode nuber
        imageContainer2.style.backgroundImage = `url('${character.image}')`;   // insert content to see the same image background of th ecard in the modale
        modale.style.display = 'block';  // using css in javascript to change display value
    }
}


// Close Modale
function closeModale() {  // Close modale function
    var modale = document.getElementById('modale'); //Section where I search for elements and give them a variable
    var locationElement = modale.querySelector('.location'); //Section where I search for elements and give them a variable
    var episodeElement = modale.querySelector('.episode');//Section where I search for elements and give them a variable 
    
    
    locationElement.textContent = '';  // insert empty content so that there are no problems when closing the modal
    episodeElement.textContent = '';// insert empty content so that there are no problems when closing the modal

    modale.style.display = 'none';  // using css in javascript to change display value
}



 /* var filteredCharactersAlive = characters.filter(character => character.status.toLowerCase() === 'alive');
  var filteredCharactersDead = characters.filter(character => character.status.toLowerCase() === 'dead');
  var filteredCharactersUnknown = characters.filter(character => character.status.toLowerCase() === 'unknown');

  var cardContainers = document.querySelectorAll(".Card");
  cardContainers.forEach(cardContainer => {
      // Selezioniamo casualmente un personaggio tra quelli filtrati per ogni status
      var character;
      if (filteredCharactersAlive.length > 0) {
          character = filteredCharactersAlive[Math.floor(Math.random() * filteredCharactersDead.length)];
      } else if (filteredCharactersDead.Deadlength > 0) {
          character = filteredCharactersDead[Math.floor(Math.random() * filteredCharactersDead.length)];
      } else if (filteredCharactersUnknown.length > 0) {
          character = filteredCharactersUnknown[Math.floor(Math.random() * filteredCharactersUnknown.length)];
      } else {
          // Se non ci sono personaggi, nascondiamo la carta
          cardContainer.style.display = 'none';
          return;
      }})*/ 