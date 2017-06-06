$( document ).ready(function(){
      // Initial array
      var first = ["toasters", "Subaru WRX STI", "Alien", "Ice Age"];

      //display the initial list of Giphs
      renderButtons1();

      function renderButtons1(){
        for (i = 0; i < first.length; i++) { 
           $("#buttons-view").append("<button class='btn btn-primary btn-giphs' data-movie='" + first[i] + "'>" + first[i] + "</button>");
           console.log(first.length);
           console.log("<button data-movie='" + first[i] + "'>" + first[i] + "</button>");

              };
      };

        // Function to display newly added buttons
      function renderButtons2() {
          console.log(first.length);

        //prevents button repeats of the same name.
        var newGiph = $("#giphy-input").val().trim();
        console.log(newGiph);

          if(first.indexOf(newGiph) != -1){
    
            console.log("REPEAT PREVENTED");

            return false;
          }

          else{
        //if its not a repeat, the function pulls from the 

        first.push(newGiph);

        console.log(newGiph);

        $("#buttons-view").empty();

        $("#giphy-input").empty();
       
        for (i = 0; i < first.length; i++) { 
           $("#buttons-view").append("<button class='btn btn-primary btn-giphs' data-movie='" + first[i] + "'>" + first[i] + "</button>");
           console.log(first.length);
           console.log("<button data-movie='" + first[i] + "'>" + first[i] + "</button>");

              };
            }
       };

      // When the button is clicked, the new text is pushed into an array
      $("#add-giph").on("click", function() {
      
      renderButtons2();
      });

      //API Call function

    // $("button").on("click", function() {
    $(document).on("click", ".btn-giphs", function() {
      var giphName = $(this).attr('data-movie');
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        giphName + "&api_key=dc6zaTOxFJmzC&limit=10";

        console.log(giphName);

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {

          var results = response.data;

          console.log(results);

          for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div>");

            var movieImage = $("<img>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            movieImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);

            gifDiv.prepend(movieImage);

            $("#gifs-appear-here").prepend(gifDiv);
          }
        });
    });

});