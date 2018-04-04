$(document).ready(function(){


  $("#geoButton").click(function(){
    var locale = [];


    //check if geolocation is possible
    if (navigator.geolocation) {
      //get geolocation
      navigator.geolocation.watchPosition(function(position){
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        locale.push(lat, lon);

        shareLocation();
      });

      function shareLocation(){
        //alert(locale);
        var localeLat = locale[0];
        var localeLon = locale[1];

        var urlString = "https://fcc-weather-api.glitch.me/api/current?lat=" +
                        localeLat + "&lon="+ localeLon;

        var description = "";
        var celcius = "";
        var fahrenheit = "";
        var wind = "";
        var icon = "";

        $.getJSON(urlString, function(result){
          description = result.weather[0].description;
          icon = result.weather[0].icon;
          celcius = result.main.temp;
          fahrenheit = (celcius * 9/5) + 32;
          wind = result.wind.speed;

          $(".icon").attr("src", icon);
          $(".description").html(description);

          console.log(description, celcius, wind);
        });

      }
    }
    //warning if browser is unable to get geolocation
    else{
      document.write('Your browser does not support GeoLocation');
    }
  });

});
