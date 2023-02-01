let timezone = document.getElementById("u-timezone");
let offsetSTD = document.getElementById("u-std");
let STDSeconds = document.getElementById("u-seconds");
let DSTSeconds = document.getElementById("u-dst");
let country = document.getElementById("u-country");
let city = document.getElementById("u-city");
let postCode = document.getElementById("u-postal");
let latitude = document.getElementById("u-lat");
let longitude = document.getElementById("u-lon");
let button = document.getElementById("button");
const addressInput = document.getElementById("input");

navigator.geolocation.getCurrentPosition(function (position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  console.log("Latitude is " + latitude + " and longitude is " + longitude);
  setCurrentLocation(lat, long);
});

function setCurrentLocation(lat, long) {
  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=4661ed375425489aa527852b1ad4d3b2`
  )
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      fillDetails(data);
    });
}

function fillDetails(data) {
  timezone.innerText = data.results[0].timezone.name;
  latitude.innerText = data.results[0].lat;
  longitude.innerText = data.results[0].lon;
  offsetSTD.innerText = data.results[0].timezone.offset_STD;
  STDSeconds.innerText = data.results[0].timezone.offset_STD_seconds;
  DSTSeconds.innerText = data.results[0].timezone.offset_DST_seconds;
  country.innerText = data.results[0].country;
  postCode.innerText = data.results[0].postcode;
  city.innerText = data.results[0].city;
}

button.addEventListener("click", locationData);

function locationData() {
  const address = addressInput.value;
  fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${address}&format=json&apiKey=4661ed375425489aa527852b1ad4d3b2`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length == 0) {
        let dd = document.getElementsByClassName('content')[1]
        dd.innerHTML = 'Please enter valid data!';
        dd.style.color = 'red';
      } else {     
        let dd = document.getElementsByClassName('content')[1]   
        dd.innerHTML = `<div >Name of the time Zone : <span id="l-timezone">${data.results[0].timezone.name}</span></div><div class="lat-lon"><div>Lat :<span id="l-lat">${data.results[0].lat}</span></div>
        <div class="l-lon">Long :<span id="correct">${data.results[0].lon}</span></div>
      </div>
      <div>Offest STD :<span id="l-std">${data.results[0].timezone.offset_STD}</span></div>
      <div>Offset STD's Seconds :<span id="l-seconds">${data.results[0].timezone.offset_STD_seconds}</span></div>
      <div>Offest DST Seconds :<span id="l-dst">${data.results[0].timezone.offset_DST_seconds}</span></div>
      <div>Country :<span id="l-country">${data.results[0].country}</span></div>
      <div>Postal Code :<span id="l-postal">${data.results[0].postcode}</span></div>
      <div>City :<span id="l-city">${data.results[0].city}</span></div>
  `;
  dd.style.color = 'white';
  document.getElementsByClassName("lower-content")[0].append(div);
      }
    });
}