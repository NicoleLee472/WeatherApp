/* let apiKey = '18e21a300ebbb03dff744f074bc3f64f'
let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?`
let displayCity = document.querySelector('#city')
let searchForm = document.querySelector('form')
let convertToC = document.querySelector('#convert-to-c')
let convertToF = document.querySelector('#convert-to-f')
let country = document.querySelector('#country')
let currentLocation = document.querySelector('#current-location')
let currentEmoji = document.querySelector('#current-weather-emoji')
let currentHighTemp = document.querySelector('#current-high-temp')
let currentLowTemp = document.querySelector('#current-low-temp')

let Temperatures = (function () {
  let temperature = document.querySelector('#current-temp')
  var celsius = 0
  var fahrenheit = 0
  var isCelsius = true
  let displayTemperatures = function () {
    if (isCelsius) {
      temperature.innerHTML = celsius
    } else {
      temperature.innerHTML = fahrenheit
    }
  }
  //this is like an API
  return {
    setCelsiusScale: function () {
      isCelsius = true
      displayTemperatures()
    },
    setFahrenheitScale: function () {
      isCelsius = false
      displayTemperatures()
    },
    setDegreesCelsius: function (degreesC) {
      celsius = degreesC
      fahrenheit = cToF(celsius)
      displayTemperatures()
    },
  }
})()

//current location to appear on click
function showCurrentTemp(response) {
  Temperatures.setDegreesCelsius(response.data.main.temp)
  displayCity.innerHTML = response.data.name
  country.innerHTML = response.data.sys.country
  currentEmoji.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  currentHighTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°`
  currentLowTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°`
}

function generateApiCall(position) {
  var lon = position.coords.longitude
  var lat = position.coords.latitude
  axios
    .get(`${weatherUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(showCurrentTemp)
}

function getCurrentUserGps() {
  navigator.geolocation.getCurrentPosition(generateApiCall)
}

function preventDefault(f) {
  return function (event) {
    event.preventDefault()
    f()
  }
}

searchForm.addEventListener('submit', search)
convertToC.addEventListener(
  'click',
  preventDefault(Temperatures.setCelsiusScale)
)
convertToF.addEventListener(
  'click',
  preventDefault(Temperatures.setFahrenheitScale)
)
currentLocation.addEventListener('click', getCurrentUserGps)



//display requested city on submit
function search(event) {
  event.preventDefault()
  let input = document.querySelector('#requested-city')
  axios
    .get(`${weatherUrl}q=${input.value}&appid=${apiKey}&units=metric`)
    .then(showCurrentTemp)
}

function generateApiCall(position) {
  var lon = position.coords.longitude
  var lat = position.coords.latitude
  axios
    .get(`${weatherUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(showCurrentTemp)
}

function getCurrentUserGps() {
  navigator.geolocation.getCurrentPosition(generateApiCall)
}
 */
//display the date under the search bar
let now = new Date()
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}
let displayDate = document.querySelector('#current-date')
displayDate.innerHTML = now.toLocaleDateString('en-AU', options)

/* //convert Fahrenheit to Celsius
function fToC(tempInF) {
  return Math.round((5 / 9) * (tempInF - 32))
}
//convert Celsuis to Fahrenheit
function cToF(tempInC) {
  return Math.round((tempInC * 9) / 5 + 32)
}
 */
