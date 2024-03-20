var image = document.querySelector(".containerImage");
var status = document.querySelector(".status");
var name = document.querySelector(".name");
var race = document.querySelector(".Race");
var gender = document.querySelector(".Gender");

var card = document.querySelector("Card")

var button = document.querySelectorAll(".ButtonSection")
var content = document.querySelector(".content")
var CardSelector = document.querySelector('.CardSelector')
var Section3H1 = document.querySelector(".Section3H1")



button.forEach(button => {
button.addEventListener("click", function() { 
    content.classList.add("fade-out");
    CardSelector.classList.add("fade-in");
        setTimeout(function() {
            content.style.display = "none";
        }, 1000);

        

    console.log("Hai cliccato su myElement!");
 });
});









// SECTION API 

function getCharacters(done) {
    
    const results = fetch ("https://rickandmortyapi.com/api/character")
results
.then (reponse => reponse.json())
.then (data => {
    done(data)
    console.log(data)
});

}


// Function API for ALL CHAR
async function getAllCharacters() {
    let allCharacters = [];
    let pageNumber = 1;

    while (true) {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${pageNumber}`);
        const data = await response.json();
        const characters = data.results;
        allCharacters = allCharacters.concat(characters);

        // If there is no pages Stop the loop 
        if (!data.info.next) {
            break;
        }

        pageNumber++;
    }

    return allCharacters;
}

// 
function CharCard(characters) {
    var cardContainers = document.querySelectorAll(".Card");
    cardContainers.forEach(cardContainer => {
        var character = characters[Math.floor(Math.random() * characters.length)];

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
    });
}

// function to see if there is errors
getAllCharacters()
    .then(characters => CharCard(characters))
    .catch(error => console.error("Si è verificato un errore:", error));

    

// Show Modale
function showModale() {
    console.log("hello")
    var modale = document.getElementById('modale');
    modale.style.display = 'block';
  }
  
  // Close Modale
  function closeModale() {
    var modale = document.getElementById('modale');
    modale.style.display = 'none';
  }
  


