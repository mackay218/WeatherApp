$(document).ready(function(){

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

        var city = "";

        var cityString = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + localeLat + "," + localeLon + "&key=AIzaSyB0Hk07Fs5gTfUHmUqDOUvhUIXOKQwAtPY"

        $.getJSON(cityString, function(response){
          city = response.results[2].address_components[1].long_name + ", " + response.results[2].address_components[2].short_name;
          console.log(city);

          $(".city").html(city);
        });


        var weatherString = "https://fcc-weather-api.glitch.me/api/current?lat=" +
                        localeLat + "&lon="+ localeLon;

        var description = "";
        var celsius = "";
        var fahrenheit = "";
        var wind = "";
        var icon = "";
        var temp = ""
        var d = "";
        var h = "";
        var sunrise = "";
        var sunset = "";

        $.getJSON(weatherString, function(result){
          description = result.weather[0].description;
          icon = result.weather[0].icon;
          celsius = result.main.temp;
          fahrenheit = (celsius * 9/5) + 32;
          wind = "wind: " + result.wind.speed + "mph";
          humidity = "humidity: " + result.main.humidity + "%";

          console.log(description, celsius, wind, humidity, icon);

          temp = fahrenheit + " &#8457";

          $(".description").html(description);
          $(".temp").html(temp);
          $(".tempBtn").html("switch to &#8451");
          $(".wind").html(wind);
          $(".humidity").html(humidity);

          //get time of day
          d = new Date();
          h = d.getHours();
          console.log(h);

          //get sunrise & sunset
          $.getJSON("https://api.sunrise-sunset.org/json?lat=" + localeLat + "&lng=" + localeLon, function(response){
            sunrise = response.results.sunrise;
            sunset = response.results.sunset;

            //split strings into array of chars
            sunrise = sunrise.split("");
            sunset = sunset.split("");

            //get chars of hour, remove preceding zeros, convert to int
            if(sunrise[11] == "0"){
              sunrise = sunrise[12];
              sunrise = number(sunrise);
            }
            else{
              sunrise = sunrise[11] + sunrise[12];
              sunrise = number(sunrise);
            }
            if(sunset[11] == "0"){
              sunset = sunset[12];
              sunset = number(sunset);
            }
            else{
              sunset = sunset[11] + sunset[12];
              sunset = number(sunset);
            }

            console.log(sunrise, sunset);
          });


          //change icon depending on description
          if(description == "scattered clouds" || description == "few clouds" ||
            description == "broken clouds"){


            }



          var clickCount = 1;

          //function for temp unit change
          $(".tempBtn").click(function(){

            if(clickCount == 1){
              temp = fahrenheit + " &#8457";
              $(".tempBtn").html("switch to &#8451");
            }
            else if(clickCount % 2 == 0){
              temp =  celsius + "&#8451";
              $(".tempBtn").html("switch to &#8457");
            }
            else{
              temp = fahrenheit + " &#8457";
              $(".tempBtn").html("switch to &#8451");
            }
            $(".temp").html(temp);
            clickCount += 1;

          });

        });

      }
    }
    //warning if browser is unable to get geolocation
    else{
      document.write('Your browser does not support GeoLocation');
    }


});
