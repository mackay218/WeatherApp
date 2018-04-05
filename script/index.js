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

        //get time of day
        d = new Date();
        h = d.getHours();
        console.log(h);

        //get sunrise & sunset
        $.getJSON("https://api.sunrise-sunset.org/json?lat=" + localeLat + "&lng=" + localeLon + "&formatted=0", function(response){

            var sunriseString = response.results.sunrise;
            var sunsetString = response.results.sunset;



            //split strings into array of chars
            var sunriseArray = [];
            sunriseArray = sunriseString.split("");
            var sunsetArray = [];
            sunsetArray = sunsetString.split("");

            console.log(sunriseArray, sunsetArray);

            //get chars of hour, remove preceding zeros, convert to int
            if(sunriseArray[11] == "0"){
              sunrise = sunriseArray[12];
              sunrise = Number(sunrise);
            }
            else{
              sunrise = sunriseArray[11] + sunriseArray[12];
              sunrise = Number(sunrise);
            }
            if(sunset[11] == "0"){
              sunset = sunsetArray[12];
              sunset = Number(sunset);
            }
            else{
              sunset = sunsetArray[11] + sunsetArray[12];
              sunset = Number(sunset);
            }

            //correction because API response is off by 5 hours
            sunrise = sunrise - 5;

            if(sunset == 0){
              sunset = 19;
            }
            else{
              sunset = sunset - 5;
            }

            console.log(sunrise, sunset);
        });

        $.getJSON(weatherString, function(result){
          description = result.weather[0].description;
          icon = result.weather[0].icon;
          celsius = Math.round(result.main.temp);
          fahrenheit = Math.round((celsius * 9/5) + 32);
          wind = "wind: " + result.wind.speed + "mph";
          humidity = "humidity: " + result.main.humidity + "%";

          console.log(description, celsius, wind, humidity, icon);

          temp = fahrenheit + " &#8457";

          $(".description").html(description);
          $(".temp").html(temp);
          $(".tempBtn").html("switch to &#8451");
          $(".wind").html(wind);
          $(".humidity").html(humidity);
          $(".icon").attr("style", "opacity: 1");

          //change icon depending on description

          //clear
          if(description == "clear sky" || description == "calm"){
            if(h >= sunrise && h < sunset){
              $(".icon").attr("src", "styles/weatherIcons/clearSun.svg");
            }
            if(h >= sunset || h < sunrise){
              $(".icon").attr("src", "styles/weatherIcons/clearMoon.svg");
            }
          }
          //partly cloudy
          if(description == "scattered clouds" || description == "few clouds" ||
            description == "broken clouds"){
              //daytime
              if(h > sunrise && h < sunset){
                $(".icon").attr("src", "styles/weatherIcons/partlyCloudyDay.svg");
              }
              //nighttime
              else if(h > sunset || h < sunrise){
                $(".icon").attr("src", "styles/weatherIcons/partlyCloudyNight.svg");
              }
            }
          //overcast
          if(description == "overcast clouds"){
            $(".icon").attr("src", "styles/weatherIcons/cloudy.svg");
          }
          //drizzle
          if(description == "light intensity drizzle" || description == "drizzle" ||
              description == "heavy intensity drizzle" ||
              description == "light intensity drizzle rain" ||
              description == "drizzle rain" ||
              description == "heavy intensity drizzle rain" ||
              description == "shower rain drizzle" ||
              description == "heavy shower rain and drizzle" ||
              description == "shower drizzle"){

                $(".icon").attr("src", "styles/weatherIcons/drizzle.svg");
              }
          //light rain
          if(description == "light rain" || description == "moderate rain" ||
             description == "light intensity shower rain"){
            $(".icon").attr("src", "styles/weatherIcons/lightRain.svg");
          }
          //heavy rain
          if(description == "heavy intensity rain" ||
             description == "very heavy rain" ||
             description == "extreme rain" ||
             description == "freezing rain" ||
             description == "shower rain" ||
             description == "heavy intensity shower rain" ||
             description == "ragged shower rain"){

               $(".icon").attr("src", "styles/weatherIcons/heavyRain.svg");
             }
          //storms
          if(description == "thunderstorm with light rain" ||
             description == "thunderstorm with rain" ||
             description == "thunderstorm with heavy rain" ||
             description == "light thunderstorm" ||
             description == "thunderstorm" ||
             description == "heavy thunderstorm" ||
             description == "ragged thunderstorm" ||
             description == "thunderstorm with light drizzle" ||
             description == "thunderstorm with drizzle" ||
             description == "thunderstorm with heavy drizzle" ||
             description == "storm" ||
             description == "violent storm"){

               $(".icon").attr("src", "styles/weatherIcons/thunderStorm.svg");
             }
          //snow
          if(description == "light snow" || description == "snow" ||
             description == "heavy snow" || description == "sleet" ||
             description == "shower sleet" ||
             description == "light rain and snow" ||
             description == "rain and snow" ||
             description == "light shower snow" ||
             description == "shower snow" ||
             description == "	heavy shower snow"){

               $(".icon").attr("src", "styles/weatherIcons/snow.svg");
             }
          //fog/mist/sand etc.
          if(description == "mist" || description == "smoke" ||
             description == "haze" || description == "sand, dust whirls" ||
             description == "fog" || description == "sand" ||
             description == "dust" || description == "volcanic ash"){

               $(".icon").attr("src", "styles/weatherIcons/haze.svg");
             }
          //wind
          if(description == "light breeze" || description == "gentle breeze" ||
             description == "moderate breeze" ||
             description == "fresh breeze" || description == "strong breeze" ||
             description == "high wind, near gale" ||
             description == "gale" || description == "severe gale" ||
             description == "squalls"){

              $(".icon").attr("src", "styles/weatherIcons/windy.svg");
             }
          //extremes
          if(description == "tornado" || description == "hurricane" ||
             description == "tropical storm"){

            $(".icon").attr("src", "styles/weatherIcons/tornado.svg");
          }
          if(description == "cold"){
            $(".icon").attr("src", "styles/weatherIcons/cold.svg");
          }
          if(description == "hot"){
            $(".icon").attr("src", "styles/weatherIcons/hot.svg");
          }
          if(description == "hail"){
            $(".icon").attr("src", "styles/weatherIcons/hail.svg");
          }
          var clickCount = 1;

          //function for temp unit change
          $(".tempBtn").click(function(){
              clickCount += 1;

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


          });

        });

        fahrenheit = 60;

        var signatureStyle = "";

        //change background based on temp
        if(fahrenheit <= 50){

          signatureStyle = "-webkit-background-clip: text; \
            -moz-background-clip: text; \
            background-clip: text; \
            color: transparent; \
            text-shadow: 0px 1px 2px rgba(255,255,255,0.2); \
            background: linear-gradient(to bottom right, #fff, #0A48A9, #fff, #1A5ECB, #fff);"

          $("body").attr("style", "background: linear-gradient(to bottom, #1A5ECB 90%, #fff);");
          $("#sig").attr("style", signatureStyle);
          $("#sigLogo").attr("style", signatureStyle);
        }
        else if(fahrenheit > 50){

          signatureStyle = "-webkit-background-clip: text; \
            -moz-background-clip: text; \
            background-clip: text; \
            color: transparent; \
            text-shadow: 0px 1px 2px rgba(0,0,0,0.2); \
            background: linear-gradient(to bottom right, #FFE168, #FF6E0B, #FFE168, #C44F00, #FFE168);"

          $("body").attr("style", "background: linear-gradient(to bottom, #FF6E0B, #FFE168);");
          $("#sig").attr("style", signatureStyle);
          $("#sigLogo").attr("style", signatureStyle);
        }

      }
    }
    //warning if browser is unable to get geolocation
    else{
      document.write('Your browser does not support GeoLocation');
    }


});
