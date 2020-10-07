$(document).ready(function() {

    function cuisines(lat, long) {
        var apiKey = "b719894d13610808dbf09abce78bb1ea";
        var queryURL = "https://developers.zomato.com/api/v2.1/cuisines?lat=" + lat + "&lon=" + long

        $.ajax({
            dataType: "json",
            url: queryURL,
            method: "GET",
            headers: {
            'user-key': apiKey,
            },
            success: function (response) {
                console.log(response);
                console.log(response.cuisines);

                for (i = 0; i < response.cuisines.length; i++) {
                    var cuisBtn = $("<button>").text(response.cuisines[i].cuisine.cuisine_name).addClass("cuisineBtn").attr("data-index", response.cuisines[i].cuisine.cuisine_id); 
                    $(".searchOptions").append(cuisBtn);
                }

                $(".cuisineBtn").on("click", function() {
                    var cuisID = $(this).data("index");
                    console.log(cuisID);
                    console.log($(this).data("index"));

                    cuisineList(cuisID, lat, long)
                })
            }
        })
    }

    function cuisineList(cuisineID, lat, long) {
        var apiKey = "b719894d13610808dbf09abce78bb1ea";
        var queryURL = "https://developers.zomato.com/api/v2.1/search?lat=" + lat + "&lon=" + long + "&cuisines=" + cuisineID

        $.ajax({
            dataType: "json",
            url: queryURL,
            method: "GET",
            headers: {
            'user-key': apiKey,
            },
            success: function (response) {
                console.log(response);
                console.log(lat, long, cuisineID);

                for (i = 0; i < response.restaurants.length; i++) {
                    var rName = $("<p>").text(response.restaurants[i].restaurant.name);
                    var hours = $("<p>").text(response.restaurants[i].restaurant.timings);
                    var phone = $("<p>").text(response.restaurants[i].restaurant.phone);
                    var website = $("<p>").text(response.restaurants[i].restaurant.url);
                    var location = $("<p>").text(response.restaurants[i].restaurant.location.address);

                    $(".restaurantList").append(rName, hours, phone, website, location);
                }
            }
        })
    }

    function zipSearch(zipco) {
        var apiKey1 = "Fav9FCMlr3R1KBTsPH43nJ5vOVAhUTeH";
        var queryURL = "http://open.mapquestapi.com/geocoding/v1/address?key=" + apiKey1 + "&location=" + zipco;

        $.ajax({
            dataType: "json",
            url: queryURL,
            method: "GET",
            headers: {
                'user-key': apiKey1,
            },
            success: function (response) {
                console.log(response);

                var longitude = response.results[0].locations[0].latLng.lng
                console.log(longitude)
                window.localStorage.setItem("longitude", JSON.stringify(longitude));

                var latitude = response.results[0].locations[0].latLng.lat
                console.log(latitude)
                window.localStorage.setItem("latitude", JSON.stringify(latitude));

                cuisines(latitude, longitude)

                searchQuery(newSearch(), latitude, longitude)
            }  
        })       
    }
    
    function newSearch() {
        $("#search-restaurants").text("Search for a dish or pick a cuisine:")
        userTextForm.on("submit", function(event) {
            event.preventDefault();
            $(".searchOptions").empty
            $(".restaurantList").empty()
            var query = $("#restaurant-input-field").val().trim();
            searchQuery(query)
            $("#restaurant-input-field").val("");
        })
    }

    function searchQuery(query, lat, long) {
        var apiKey = "b719894d13610808dbf09abce78bb1ea";
        var queryURL = "https://developers.zomato.com/api/v2.1/search?q=" + query + "&lat=" + lat + "&lon=" + long
        console.log(query, lat, long);

        $.ajax({
            dataType: "json",
            url: queryURL,
            method: "GET",
            headers: {
            'user-key': apiKey,
            },
            success: function (response) {
                console.log(response);
                
            
                
            }
        })
    }

    userTextForm = $("#search-restaurants");
    userTextForm.on("submit", function(event) {
        event.preventDefault();
        var zip = $("#restaurant-input-field").val().trim();
        zipSearch(zip);
        $("#restaurant-input-field").val("");
        $(".searchOptions").empty();
        $(".restaurantList").empty();
    })

    userTextForm = $('#search-recipes');
    userTextForm.on("submit", function() {
        var currentSearchTerm = $("#recipe-input-field").val();
        searchForRecipes(currentSearchTerm);
        event.preventDefault();
        $("#recipe-input-field").val("");
        $(".searchOptions").empty();
        $(".restaurantList").empty();
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
})
