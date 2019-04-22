//Set variables under global scope

// Initial array of buttons

var topics = [
  "Basketball Bloopers",
  "Golf Bloopers",
  "Football Bloopers",
  "Olympic Bloopers",
  "Soccer Bloopers",
  "Baseball Bloopers"
];

// var topicInput = topic;

// Function to display topics buttons
$(document).ready(function() {
  // Delete the content inside the buttons-view div prior to adding new topics
  $("#buttons-view").empty();

  // Loop through the array of topics, then generate buttons for each topic in the array

  for (i = 0; i < topics.length; i++) {
    var btn = $(
      "<button type= 'button' class='btn-outline-info'>" +
        topics[i] +
        "</button>"
    );
    btn.attr("data-name", topics[i]);
    $("#buttons-view").append(btn);
  }

  $("#add-topic").on("click", function(event) {
    // event.preventDefault() prevents submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
    event.preventDefault();

    //hold input in variable
    var topicInput = $("#topic-input").val();
    // Write code to add the new topics into the topics array ss
    var newBtn = $(
      "<button  class='btn-outline-info'>" + topicInput + "</button>"
    );

    if (topicInput) {
      topics.push(topicInput);

      newBtn.attr("data-name", topics[i]);
      $("#buttons-view").append(newBtn);
    }

    console.log(topicInput);
    console.log(topics);
  });

  // Event listener for all button elements with class ".button"
  $(".btn-outline-info").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var topic = $(this).attr("data-name");

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      topic +
      "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {
        //Empty div where result will appear to replace prior selection
        $("#gifs-appear-here").empty();

        // Looping over every result item
        for (var i = 0; i < response.data.length; i++) {
          // Creating a div for the gif
          var gifDiv = $("<div class='col-md-4'>");

          // Creating a paragraph tag with the result item's rating
          var rating = $("<p>").text("Rating: " + response.data[i].rating);

          // Creating an image tag
          var newImage = $(
            '<img src= " ' +
              response.data[i].images.fixed_height_still.url +
              '" data-still=" ' +
              response.data[i].images.fixed_height_still.url +
              ' " data-animate=" ' +
              response.data[i].images.fixed_height.url +
              '" data-state="still" class="movImage" style= "width:250px; height:250px">'
          );

          // Appending the paragraph and personImage we created to the "gifDiv" div we created
          gifDiv.append(rating);
          gifDiv.append(newImage);

          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          $("#gifs-appear-here").prepend(gifDiv);

          //Pause&Continue function
          $(".movImage").on("click", function() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
        }
      });
  });
});
