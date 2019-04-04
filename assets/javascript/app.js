// page will load a few buttons at first from a predefined array. 
// These buttons will run a function that calls the Giphy API and returns particular values to the screen. 
// User can input a new button with the submit form and this button will also load from Giphy

// initial array of buttons
var animalList = ["turkey", "dolphin", "tortoise", "dalmation", "goose"];
var jsonData;

// Create buttons from animalList
function buttonCreator() {
    for (let i = 0; i < animalList.length; i++) {
        var btn = $("<button>")
            .addClass("btn btn-info m-2 animalButton")
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

// function that makes a call to giphy
// write the giphy call response to the page (still image and rating)
function displayGifs() {
    var apiKey = "7hAa0vau8Cuj2wF2cdqwJqZWdjmfU04Z"
    var q = $(this).attr("data-name");
    var limit = 10;
    // var rndOffset = Math.floor(Math.random()*1000);
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + q + "&limit=" + limit;

    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("JSON" + response);

        jsonData = response.data;

        for (let i = 0; i < response.data.length; i++) {
            // Will need to add logic to add more responses if rating isn't g or pg
            // only return pg and g rated

            if (response.data[i].rating === "g" || response.data[i].rating === "pg") {
                var stillGifUrl = response.data[i].images.original_still.url;
                var animatedGifUrl = response.data[i].images.downsized_large.url;
                var rating = response.data[i].rating;

                // var gifDiv = $("<div style='display: block; position: relative'>");
                // var pRating = $("<p style='display: inline; position: absolute; top: -18px'>").text("Rating: " + rating);
                var gifDiv = $("<div>").attr("style", "display: inline-block; position: relative").addClass("gif-div, m-4");
                var pRating = $("<p>").attr("style", "position: absolute; top: -1.5rem").text("Rating: " + rating);
                var imgTag = $("<img>").addClass("gif").attr("src", stillGifUrl).attr("data-still", stillGifUrl).attr("data-animated", animatedGifUrl).attr("state", "still");

                // conditional to set 
                // if(imgTag.attr("state") === "still"){
                //     imgTag = $("<img>").addClass("gif").attr("src", stillGifUrl);
                // } else if (imgTag.attr("state") === "animated"){
                //     imgTag = $("<img>").addClass("gif").attr("src", animatedGifUrl);
                // };


                // gif cluster ties together the whole div
                var gifCluster = gifDiv
                    .append(pRating)
                    .append(imgTag)

                // write the whole div to the HTML
                $("#gifDisplay").prepend(gifCluster)

                // TODO: randomize the gifs that are returned
            }
        }
    })
}

$(document).on("click", ".gif", function () {
    console.log(this)

    var gifState = $(this).attr("state");
    var gifUrl = $(this).attr("src");
    var gifStill = $(this).attr("data-still")
    var gifAnimated = $(this).attr("data-animated")

    console.log(gifUrl)
    console.log(gifStill)
    console.log(gifAnimated)

    if (gifState === "still") {
        $(this).attr("state", "animated")
        $(this).attr("src", gifAnimated);
    } else {
        $(this).attr("state", "still")
        $(this).attr("src", gifStill);

    }
})

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".animalButton", displayGifs);

// TODO: click handler on created gifs that will run the gif when clicked


// Create initial buttons
buttonCreator();
