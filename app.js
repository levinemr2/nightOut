

$("#cityBtn").on("click", function() {
  event.preventDefault();
  var show = $(this).attr("data-show");
  var queryURL =
    "https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=sXaOY3gZG8DXBK0h5AAJIFPCfflg5Cg2&city=" +
    $("#cityInput").val();

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response._embedded.events;
    console.log(results);
    for (var i = 0; i < results.length; i++) {
      var eventDiv = $("<div>");
      var event = results[i].name;
      var date = results[i].dates.start.localDate;
      var venue = results[i]._embedded.venues[0].name;
      var p = $("<p>").html(event + "<br>" + date + "<br>" + venue);
      

      eventDiv.prepend(p);
      $("#cityDump").prepend(eventDiv);
    }
  });
});


$("#artistBtn").on("click", function() {
    event.preventDefault();
    var artist = $(this).attr("data-artist");
    
    $.ajax({
        url: "https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=sXaOY3gZG8DXBK0h5AAJIFPCfflg5Cg2&keyword=" +
        $("#artistInput").val(),
        method: "GET"
    }).then(function(response){
        var results = response._embedded.events;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
            var artistDiv = $("<div>");
            var event = results[i].name;
            var date = results[i].dates.start.localDate;
            var venue = results[i]._embedded.venues[0].name;
            var p = $("<p>").html(event + "<br>" + date + "<br>" + venue + "<hr>");

            
      
            artistDiv.prepend(p);
            $("#artistDump").prepend(artistDiv);
          }
    });
});

