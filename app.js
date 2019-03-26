$("#artistBtn").on("click", function() {
    event.preventDefault();
    var show = $(this).attr("data-show");
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=sXaOY3gZG8DXBK0h5AAJIFPCfflg5Cg2&city=richmond";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response._embedded.events;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
            var eventDiv = $("<div>");
            var event = results[i].name;
            var p = $("<p>").text(event);


            eventDiv.prepend(p);
            $("#artistDump").prepend(eventDiv);

        }

    });
});