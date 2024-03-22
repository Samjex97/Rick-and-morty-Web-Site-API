var image = document.querySelector(".containerImage");
var status = document.querySelector(".status");
var name = document.querySelector(".name");
var race = document.querySelector(".Race");
var gender = document.querySelector(".Gender");
var card = document.querySelector("Card");
var buttons = document.querySelectorAll(".Buttons");
var content = document.querySelector(".content");
var CardSelector = document.querySelector('.CardSelector');
var Section3H1 = document.querySelector('.Section3H1');




// BUTTON FUNCTION TO GET ALL STATUS AND CARD ELEMENT BY CLICKING IT
buttons.forEach(button => {
    button.addEventListener("click", async function () {
        content.classList.add("fade-out");
        CardSelector.classList.add("fade-in");
        setTimeout(function () {
            content.style.display = "none";
        }, 1000);
        const status = button.dataset.status;
        showCards();
        try {
            let characters;
            if (status !== 'all') {
                characters = await getCharactersByStatus(status);
            } else {
                characters = await getAllCharacters();
            }

            CharCard(characters);
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    });
});
// TO GET ALL STATUS FROM ALL PAGES OF THE API
async function getCharactersByStatus(status) {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?status=${status}`);
    const data = await response.json();
    return data.results;
}
// TO GET ALL CHARACTERS FROM ALL PAGES OF THE API
async function getAllCharacters() {
    let allCharacters = [];
    let page = 1;

    try {
        let nextPage = `https://rickandmortyapi.com/api/character?page=${page}`;
        do {
            const response = await fetch(nextPage);
            const data = await response.json();
            const characters = data.results;
            allCharacters = allCharacters.concat(characters);
            nextPage = data.info.next;
        } while (nextPage !== null);
    } catch (error) {
        console.error('Error fetching characters:', error);
    }

    return allCharacters;
}
// CARD IMAGE AND DESCRIPTION
function CharCard(characters) {
    var cardContainers = document.querySelectorAll(".Card");
    cardContainers.forEach((cardContainer) => {
        var character = characters[Math.floor(Math.random() * characters.length)];
        if (!character) {
            cardContainer.style.display = 'none';
            return;
        }

        var imageContainer = cardContainer.querySelector(".containerImage");
        var statusElement = cardContainer.querySelector(".status");
        var nameElement = cardContainer.querySelector(".name");
        var raceElement = cardContainer.querySelector(".Race");
        var genderElement = cardContainer.querySelector(".Gender");

        imageContainer.style.backgroundImage = `url('${character.image}')`;
        imageContainer.style.backgroundSize = "cover";
        imageContainer.style.backgroundPosition = "center";

        statusElement.textContent = `Status: ${character.status}`;
        nameElement.textContent = `Name: ${character.name}`;
        raceElement.textContent = `Race: ${character.species}`;
        genderElement.textContent = `Gender: ${character.gender}`;

        cardContainer.addEventListener("click", function () {
            showModale(character);
        });
    });
}
// Show CARDS
function showCards() {
    const cards = document.querySelectorAll('.Card');
    var Section3H1 = document.querySelector('.Section3H1');
    var Section3 = document.querySelector('.Section3');
    var MoveButton = document.querySelector('.MoveButton');

    cards.forEach(card => {
        card.style.display = 'block';
        Section3H1.style.display = 'none';
        Section3.style.display = 'block';
        MoveButton.style.display = 'none';
    });
}

function showModale(character) {
    var modale = document.getElementById('modale');
    var locationElement = modale.querySelector('.location');
    var episodeElement = modale.querySelector('.episode');
    var imageContainer2 = document.querySelector(".containerImageModale");

    if (character && character.image && character.episode && character.episode.length > 0) { 
        // Estrai il numero dell'episodio dall'URL
        var episodeNumber = character.episode[0].split('/').pop();
        locationElement.textContent = character.location.name;
        episodeElement.textContent =  episodeNumber; // Aggiungi "Episode: " prima del numero
        imageContainer2.style.backgroundImage = `url('${character.image}')`;
        modale.style.display = 'block';
    }
}


// Close Modale
function closeModale() {
    var modale = document.getElementById('modale');
    var locationElement = modale.querySelector('.location');
    var episodeElement = modale.querySelector('.episode');
    
    
    locationElement.textContent = '';
    episodeElement.textContent = '';

    modale.style.display = 'none';
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