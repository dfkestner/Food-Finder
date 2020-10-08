$(document).ready(function() {   
    $("#restaurant-input-button").on("click", function(event) {
        event.preventDefault();
        $(".cuisineBtn").remove();
        $(".restList").empty();
        var zip = $("#restaurant-input-field").val().trim();
        console.log(zip);
        zipSearch(zip);
        $("#restaurant-input-field").val("");
    })
    
    function zipSearch(zipCode) {
        var apiKey1 = "Fav9FCMlr3R1KBTsPH43nJ5vOVAhUTeH";
        var queryURL = "http://open.mapquestapi.com/geocoding/v1/address?key=" + apiKey1 + "&location=" + zipCode;

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
                console.log(longitude);
                window.localStorage.setItem("longitude", JSON.stringify(longitude));

                var latitude = response.results[0].locations[0].latLng.lat
                console.log(latitude);
                window.localStorage.setItem("latitude", JSON.stringify(latitude));

                $(".searchCats").remove();

                var searchFor = $("<input>").attr({"type": "text", "id": "searchParty", "placeholder": "What sounds good?"}).addClass("searchCats");
                $(".searchOptions").append(searchFor);
                var btnSearch = $("<button>").text("Search").attr("id", "searchBtn").addClass("searchCats");
                $(searchFor).after(btnSearch);
                var catDecisions = $("<h3>").text("OR").addClass("searchCats");
                $(btnSearch).after(catDecisions);
                var catSearchBtn = $("<button>").text("Check it out! Browse by Cuisine!").attr("id","catBtnSearch").addClass("searchCats");
                $(catDecisions).after(catSearchBtn);

                $("#searchBtn").on("click", function(event) {
                    event.preventDefault();
                    $(".cuisineBtn").remove();
                    $(".restList").empty();
                    $("#recipe-results").empty();
                    var query = $("#searchParty").val().trim();
                    window.localStorage.setItem("recentSearch", JSON.stringify(query));
                    $("#searchParty").val("");

                    var latI = JSON.parse(localStorage.getItem("latitude"));
                    var longI = JSON.parse(localStorage.getItem("longitude"));
                    
                    var apiKey = "b719894d13610808dbf09abce78bb1ea";
                    var queryURL = "https://developers.zomato.com/api/v2.1/search?q=" + query + "&lat=" + latI + "&lon=" + longI
                    console.log(query, latI, longI);
            
                    $.ajax({
                        dataType: "json",
                        url: queryURL,
                        method: "GET",
                        headers: {
                        'user-key': apiKey,
                        },
                        success: function (response) {
                            console.log(response);
                            console.log(response);

                            $(".restList").empty();

                            for (i = 0; i < response.restaurants.length; i++) {
                                var rName = $("<h4>").text(response.restaurants[i].restaurant.name).addClass("restList");
                                var hours = $("<p>").text(response.restaurants[i].restaurant.timings).addClass("restList");
                                var phone = $("<p>").text(response.restaurants[i].restaurant.phone_numbers).addClass("restList");
                                var website = $("<p>").text(response.restaurants[i].restaurant.url).addClass("restList");
                                var location = $("<p>").text(response.restaurants[i].restaurant.location.address).addClass("restList");
                                $(".restaurantList").append(rName, hours, phone, website, location);

                            }
                        }
                    })
                })

                $("#catBtnSearch").on("click", function(event) {
                    event.preventDefault();
                    var lat = JSON.parse(localStorage.getItem("latitude"))
                    var lon = JSON.parse(localStorage.getItem("longitude"))
                    var apiKey = "b719894d13610808dbf09abce78bb1ea";
                    var queryURL = "https://developers.zomato.com/api/v2.1/cuisines?lat=" + lat + "&lon=" + lon
            
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
                                $(".searchOptions").after(cuisBtn);
                            }
            
                            $(".cuisineBtn").on("click", function(event) {
                                event.preventDefault();
                                $("#recipe-results").empty();
                                var cuisID = $(this).data("index");
                                console.log($(this).data("index"));
                                window.localStorage.setItem("cuisID", JSON.stringify(cuisID));
                                $(cuisBtn).after("");

                                var latty = localStorage.getItem("latitude");
                                var longy = localStorage.getItem("longitude");
                                var cuisineID = localStorage.getItem("cuisID");
                                var apiKey = "b719894d13610808dbf09abce78bb1ea";
                                var queryURL = "https://developers.zomato.com/api/v2.1/search?lat=" + latty + "&lon=" + longy + "&cuisines=" + cuisineID

                                $.ajax({
                                    dataType: "json",
                                    url: queryURL,
                                    method: "GET",
                                    headers: {
                                    'user-key': apiKey,
                                    },
                                    success: function (response) {
                                        console.log(response);
                                        console.log(latty, longy, cuisineID);

                                        $(".restList").empty();

                                        for (i = 0; i < response.restaurants.length; i++) {
                                            var rName = $("<h4>").text(response.restaurants[i].restaurant.name).addClass("restList");
                                            var hours = $("<p>").text(response.restaurants[i].restaurant.timings).addClass("restList");
                                            var phone = $("<p>").text(response.restaurants[i].restaurant.phone_numbers).addClass("restList");
                                            var website = $("<p>").text(response.restaurants[i].restaurant.url).addClass("restList");
                                            var location = $("<p>").text(response.restaurants[i].restaurant.location.address).addClass("restList");
                                            $(".restaurantList").append(rName, hours, phone, website, location);
                                        }
                                    }
                                })
                            })
                        }
                    })
                })
            }
        })
    } 
    $('#recipe-input-button').on("click", function(event) {
        event.preventDefault();
        $(".cuisineBtn").remove();
        $(".restList").empty();
        var currentSearchTerm = $("#recipe-input-field").val().trim();
        searchForRecipes(currentSearchTerm);
        $("#recipe-input-field").val("");
    }) 
    
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
                var recipeImage = `<a target="_blank" href=" `+ response.recipes[i].source_url +`"><img src="`+ response.recipes[i].image_url +`" class="recipe-picture"></a>`
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