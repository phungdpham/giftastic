//Creating initial arrays of animals
var animals = ["bird", "dog", "cat","chicken"];

//Function for displaying animal data
function renderButtons() {
    $("#animal-view").empty();

    for (var i = 0; i < animals.length; i++) {
        
        var a = $("<button>");
            a.addClass("animal");
            a.attr("data-animal", animals[i]);
            a.text(animals[i]);
            $("#animal-view").append(a);
    }
    //Creating click event lisener to all animal button
$("button").on("click", function() {

    var animalClicked = $(this).attr("data-animal");
    console.log(animalClicked);

    //Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=vcFSZHIeOGB4Tn4z9NPhkS50gxoyUNMl&q=" + 
        animalClicked + "&limit=10&offset=0&rating=G&lang=en";
    
    //Creating an AJAX call for the specific animal button being clicked
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        // console.log(queryURL);
        //console.log(response);

        //storing the data from the AJAX request in the result variable
        var results = response.data;
        // console.log(results[1].rating);
        // Looping through each result item
        for (var i = 0; i < results.length; i++) {
            console.log(results[i]);
            //Creating a div to hold the animal
            var animalDiv = $("<div>");

            //Creating a paragraph tag with the result item's rating
            var p =$("<p>").text("Rating: " + results[i].rating);

            //Creating and storing an image tag
            var animalImage = $("<img>");

            //Setting the src attribute of the image to the property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height.url);

            //Appending the rating & images tag to the animal Div
            animalDiv.append(p);
            animalDiv.append(animalImage);

            //Prepending the animal Div to the html page
            $("#animal-images").prepend(animalDiv);
        }
    });
});
}
//Function for click event that adds more animal name
$("#add-animal").on("click", function(event) {
    event.preventDefault();
    
    //Creating varable to obtain value from textbox
    var animalAdded = $("#animal-input").val().trim();
    
    //Animal from the textbox is added to animals array
    animals.push(animalAdded);
    
    //Calling render buttons
    renderButtons();
});

renderButtons();

