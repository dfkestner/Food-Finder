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
                    $(".searchOptions").append(cuisBtn)
                }

                $(".cuisineBtn").on("click", function() {
                    var cuisID = $(this).data("index")
                    console.log(cuisID);
                    console.log($(this).data("index"));

                    cuisineList(cuisID, lat, long)
                })

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
                                var rName = $("<p>").text(response.restaurants[i].restaurant.name)
                                var hours = $("<p>").text(response.restaurants[i].restaurant.timings)
                                var phone = $("<p>").text(response.restaurants[i].restaurant.phone)
                                var website = $("<p>").text(response.restaurants[i].restaurant.url)
                                var location = $("<p>").text(response.restaurants[i].restaurant.location.address)

                                $(".restaurantList").append(rName, hours, phone, website, location)
                            }
                        }
                    })
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

                var latitude = response.results[0].locations[0].latLng.lat
                console.log(latitude)

                cuisines(latitude, longitude)
            }  
        })       
    }            

    $("#searchButton").on("click", function(event) {
        event.preventDefault();

        var zip = $("#searchZip").val().trim();

        zipSearch(zip);

        $("#searchZip").val("");
    })

    // var catButton = $("<button>").text("Search by Category").addClass("catSearch").attr("id", "catSearch");
    // $(".catList").append("<p id='category'>");
    // $("#category").append(catButton);

    // catButton.on("click", function(event){
    //     event.preventDefault();

    //     var apiKey = "b719894d13610808dbf09abce78bb1ea";
    //     var queryURL = "https://developers.zomato.com/api/v2.1/categories"

    //     $.ajax({
    //         dataType: "json",
    //         url: queryURL,
    //         method: "GET",
    //         headers: {
    //             'user-key': apiKey,
    //         },
    //         success: function (response) {
    //             console.log(response);

    //             var category = response.categories;

    //             for (i = 0; i < category.length; i++) {
    //                 var catButton2 = $("<button>").text(category[i].categories.name).addClass("categoryName").val(category[i].categories.id);
    //                 $("#catSearch").append(catButton2);
    //                 console.log(category[i].categories.name);
    //                 console.log(category[i].categories.id);

    //                 var catID = category[i].categories.id;
    //             }

    //             $(".categoryName").on("click", function(event) {
    //                 event.preventDefault();

    // //                 // var sortBy = $("<ul>").text("Sort by")
    // //                 // (catButton2).append(sortBy);
    // //                 // var cost = $("<button>").text("Cost").val(cost);
    // //                 // var rating = $("<button>").text("Rating").val(rating);
    // //                 // var distance = $("<button>").text("Distance").val(real_distance);
    // //                 // add &sort= after type number

    //                 var apiKey = "b719894d13610808dbf09abce78bb1ea";
    //                 var queryURL = "https://developers.zomato.com/api/v2.1/search?establishment_type" + catID;

    //                 $.ajax({
    //                     dataType: "json",
    //                     url: queryURL,
    //                     method: "GET",
    //                     headers: {
    //                         'user-key': apiKey,
    //                     },
    //                     success: function (response) {
    //                         console.log(response);
                    
    //                     }
    //                 })
    //             })
    //         }
    //     });
    // })

     // function collections(locID) {
    //     var apiKey = "b719894d13610808dbf09abce78bb1ea";
    //     var queryURL = "https://developers.zomato.com/api/v2.1/collections?city_id=" + locID

    //     $.ajax({
    //         dataType: "json",
    //         url: queryURL,
    //         method: "GET",
    //         headers: {
    //         'user-key': apiKey,
    //         },
    //         success: function (response) {
    //             console.log(response);
    //         }
    //     })
    // }
})
