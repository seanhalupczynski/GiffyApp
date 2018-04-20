$("document").ready(function() {

    var topics = ["slam dunk", "touchdown", "hole in one", "homerun"];

    var apikey = "8brcJYjX8RMikJ53PofeewOFIWzTeGCy";

    var giphyLink = "http://api.giphy.com/v1/gifs/search?api_key=";

    var limit = 10;

    // Function for displaying movie data
    function displayButtons() {

        // Deleting the buttons prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#gif-buttons").empty();

        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {

            // Then dynamically generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var btn = $("<button>");
            // Adding a class of movie to our button
            btn.addClass("btn btn-default topic");
            // Adding a data-attribute
            btn.attr("data-name", topics[i]);
            // Providing the initial button text
            btn.text(topics[i]);
            // Adding the button to the buttons-view div
            $("#gif-buttons").append(btn);
        };
    };
    // console.dir(document.body.childNodes[1].children);

    // Function for dumping the JSON content for each button into the div
    function displayGif() {

        var topic = $(this).attr("data-name");
        var queryURL = giphyLink + apikey + "&q=" + topic + "&limit=" + limit;
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            var data = response.data;
            for(g=0; g<data.length; g++){
                $("#gif-display").append("<img src='" + data[g].images.fixed_width_still.url + "'>");
            };

            displayButtons();
        });
    };

    // This function handles events where one button is clicked
    $("#search-button").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var topic = $("#topic-input").val().trim();
        // The movie from the textbox is then added to our array
        topics.push(topic);


        // calling renderButtons which handles the processing of our movie array
        displayButtons();
    });

    // Button on click to display Gif
    $(document).on("click", ".topic", displayGif);

    // Calling the dispalyButtons function
    displayButtons();


});

