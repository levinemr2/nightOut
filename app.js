var config = {
  apiKey: "AIzaSyAFQrS1odM50v6za6XqnUmUeKtxuUTAZGA",
  authDomain: "test-6aef2.firebaseapp.com",
  databaseURL: "https://test-6aef2.firebaseio.com",
  projectId: "test-6aef2",
  storageBucket: "test-6aef2.appspot.com",
  messagingSenderId: "637556399547"
};
firebase.initializeApp(config);

var database = firebase.database();

var place = "";

$("#cityBtn").on("click", function() {
  event.preventDefault();

  place = $("#cityInput").val().trim();

  database.ref().set({
    place: place,
  });

  database.ref().on("value", function(snapshot) {
    console.log(snapshot.val().place);
    if (typeof place !== 'string' || place instanceof Number) {
    $("#location").text("please enter a valid city")
  } else { $("#location").text(snapshot.val().place) }

  
  })


  var show = $(this).attr("data-show");
  var queryURL =
    "https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=sXaOY3gZG8DXBK0h5AAJIFPCfflg5Cg2&city=" +
    place;

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
      var p = $("<p>").html(event + "<br>" + date + "<br>" + venue + "<button data-micron='bounce' id=ticketmaster-btn>Buy Tickets</button> " + "<hr>");
      

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
            var p = $("<p>").html(event + "<br>" + date + "<br>" + venue + "<button id=ticketmaster-btn>Buy Tickets</button> " + "<hr>");

            
      
            artistDiv.prepend(p);
            $("#artistDump").prepend(artistDiv);
          }
    });
});


$(document).on("click", "#ticketmaster-btn", function(event) {
  event.preventDefault();
  window.location.href = "https://www.ticketmaster.com/";
});