// page will load a few buttons at first from a predefined array. 
// These buttons will run a function that calls the Giphy API and returns particular values to the screen. 
// User can input a new button with the submit form and this button will also load from Giphy

// initial array of buttons
var animalList = ["turkey", "dolphin", "tortoise", "dalmation", "goose"];

// Create buttons from animalList
function buttonCreator() {
    for (let i = 0; i < animalList.length; i++) {
        var btn = $("<button>")
            .addClass("btn btn-info mr-2 mb-2 animalButton")
            .attr("data-name", animalList[i])
            .text(animalList[i])
        $("#requestButtons").append(btn);
    }
}

// function that pushes user defined animal to animalList on click of submit button and creates a button to display
$("#newItem").click(function () {
    event.preventDefault();

    if ($("#user-animal").val() !== "") {
        var userAnimal = $("#user-animal").val();
        animalList.push(userAnimal);
        $("#requestButtons").empty();
        buttonCreator();
        
        // reset the input form
        $("#user-animal").val("");     
    }
})

// TODO: function that makes a call to giphy
function displayGifs() {
    var apiKey = "7hAa0vau8Cuj2wF2cdqwJqZWdjmfU04Z"
    var q = "dog"
    // var q = $(this).attr("data-name");
    var limit = 10;
    // var rndOffset = Math.floor(Math.random()*1000);
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + q + "&limit=" + limit;

    console.log(queryURL)
    // Need to have an if statement for pg and g only rated
}
displayGifs()
// TODO: write the giphy call response to the page (still image and rating)

// TODO: click handler on created gifs that will run the gif when clicked

// Create initial buttons
buttonCreator();
