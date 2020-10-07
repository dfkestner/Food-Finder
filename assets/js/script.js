userTextForm = $('#search-box');
userTextForm.on("submit", function() {
    var currentSearchTerm = $("#input-field").val();
    searchForRecipes(currentSearchTerm);
    event.preventDefault();
});


//==========================TO DO=====================================================//

// Add autocomplete search functionality
// Display publisher info and 
// Clear the div or prepend instead of append?
// Add multiple pages?
// ingredients list?? Potentially in some kinda dropdown?

//==========================TO DO=====================================================//
function searchForRecipes(searchTerm) {
var queryURL = "https://forkify-api.herokuapp.com/api/search?q=" + searchTerm;
  $.ajax({
      url: queryURL,
      method: "GET"
  })
      .then(function(response) {
        console.log(response);
        for (let i = 0; i < 5; i++) {
            currentRecipeID = response.recipes[i].recipe_id;
            getDetailedRecipeInfo(currentRecipeID);
            
            var recipeImage = `<img src="`+ response.recipes[i].image_url +`" class="recipe-picture">`
            $("#recipe-results").append(
             response.recipes[i].title +
             `<div class="image-container">`+recipeImage+`</div>`
            +'<br><br>'
            );
        }
      });
}

function getDetailedRecipeInfo(recipeID){
    var queryURL = "https://forkify-api.herokuapp.com/api/get?rId=" + recipeID;
  $.ajax({
      url: queryURL,
      method: "GET"
  })
      .then(function(response) {
        console.log(response);

      });
}