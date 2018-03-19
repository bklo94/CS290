//Brandon Lo
//CS290
//script.js
var url = "http://api.openweathermap.org/data/2.5/weather?";
var key = "&appid=0827376ec4c9c23f284c5938fa0a79e9";
var system = "&units=imperial";


//code for getting the api calls for the weather
document.getElementById("cizip").addEventListener("click", function(event){
  for (i = 0; i < document.getElementById("results").getElementsByTagName("span").length; i++) {
    document.getElementById("results").getElementsByTagName("span")[i].innerHTML = "";
  }
  //gets the city and zipecode as input
  var city = document.getElementById("city").value;
  var zipcode = document.getElementById("zipcode").value;
  //conditional format it into the openapi formatmat
  //cheks if the input is using city
  if (city.length != 0)
    var submit = "q=" + city;
  //checks if the zipcode is inputted
  else if (zipcode.length != 0)
    var submit = "zip=" + zipcode;

  //parses through XML to get the informated wanted
  //format from
  //http://eecs.oregonstate.edu/ecampus-video/CS290/core-content/ajax-forms/async-requests.html
  //submits the requst from the inputted format
  var req = new XMLHttpRequest();
  req.open("GET", url + submit + system + key, true);
  //api docs
  //https://openweathermap.org/current
  //get the coordinate, description, temp, name, humdity offered
  req.addEventListener("load",function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);

      //append a header keeping the current weather header
      var header = document.createElement("span");
      header.innerHTML = "Current Weather:" + "<br/>" + "<br/>";
      document.getElementById("results").appendChild(header);

      //get the ID
      var id = document.createElement("span");
      id.innerHTML = "ID: " + response.id + "<br/>";
      document.getElementById("results").appendChild(id);

      //gets the name
      var name = document.createElement("span");
      name.innerHTML = "Name:" + response.name + "<br/>";
      document.getElementById("results").appendChild(name);

      //gets the Longitude and Latitude
      var coordinate = document.createElement("span");
      coordinate.innerHTML = "Longitude:" + response.coord.lon + "<br/>" +
                             "Latitude:"+ response.coord.lat + "<br/>";
      document.getElementById("results").appendChild(coordinate);

      //gets temp from main
      var temp = document.createElement("span");
      temp.innerHTML = "Temperature:" + response.main.temp + " °F" +"<br/>"
      document.getElementById("results").appendChild(temp);

      //gets humidity from main
      var pressure = document.createElement("span");
      pressure.innerHTML = "Pressure:" + response.main.pressure + " mmHg" + "<br/>";
      document.getElementById("results").appendChild(pressure);

      //gets humidity from main
      var humidity = document.createElement("span");
      humidity.innerHTML = "Humidity:" + response.main.humidity + "%" + "<br/>";
      document.getElementById("results").appendChild(humidity);

      //grabs the description from the weather object
      var desc = document.createElement("span");
      desc.innerHTML = "Description:" + response.weather[0].description + "<br/>";
      document.getElementById("results").appendChild(desc);
    }
    else
      console.log("Error in network request:" + req.statusText);
  })
  req.send(null);
  event.preventDefault();
});

//code to get the post event
//format from
//http://eecs.oregonstate.edu/ecampus-video/CS290/core-content/ajax-forms/async-requests.html
var url2 = "http://httpbin.org/post";
document.getElementById("urlSubmit").addEventListener("click", function(event){
    var req = new XMLHttpRequest();
    var payload = {send:null};
    payload.send = document.getElementById("send").value;
    req.open("POST", url2, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener("load",function(){
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        var parse = JSON.parse(response.data);

        //gets the response data and displays it
        var info = document.createTextNode(parse["send"]);
        document.getElementById("results2").appendChild(info);

        //creates a new line so if you repeatly send it puts it in a newline instead of on the same line
        var lines = document.createElement("br");
        document.getElementById("results2").appendChild(lines);
      }
      else
        console.log("Error in network request: " + req.statusText);
      });
    req.send(JSON.stringify(payload));
    event.preventDefault();
  });
