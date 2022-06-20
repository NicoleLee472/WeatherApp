let apiKey = '18e21a300ebbb03dff744f074bc3f64f'
let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?`
let displayCity = document.querySelector('#city')
let searchForm = document.querySelector('form')
let temp = document.querySelector('#current-temp')
let convertToC = document.querySelector('#convert-to-c')
let convertToF = document.querySelector('#convert-to-f')
let country = document.querySelector('#country')
let currentLocation = document.querySelector('#current-location')
let currentEmoji = document.querySelector('#current-weather-emoji')
let currentHighTemp = document.querySelector('#current-high-temp')
let currentLowTemp = document.querySelector('#current-low-temp')

searchForm.addEventListener('submit', search)
convertToC.addEventListener('click', displayCelsuis)
convertToF.addEventListener('click', displayFahrenheit)
currentLocation.addEventListener('click', getCurrentUserGPS)

let days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
let months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

//display requested city on submit
function search(event) {
  event.preventDefault()
  let input = document.querySelector('#requested-city')
  axios
    .get(`${weatherUrl}q=${input.value}&appid=${apiKey}&units=metric`)
    .then(showCurrentTemp)
}

function displayCelsuis(event) {
  event.preventDefault()
  temp.innerHTML = `${fToC(parseInt(temp.innerHTML.slice(0, -2), 10))}°C`
}

function displayFahrenheit(event) {
  event.preventDefault()
  temp.innerHTML = `${cToF(parseInt(temp.innerHTML.slice(0, -2), 10))}°F`
}

//current location to appear on click
function showCurrentTemp(response) {
  displayCity.innerHTML = response.data.name
  temp.innerHTML = `${Math.round(response.data.main.temp)}℃`
  country.innerHTML = response.data.sys.country
  currentEmoji.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  currentHighTemp.innerHTML = `${Math.round(response.data.main.temp_max)}℃`
  currentLowTemp.innerHTML = `${Math.round(response.data.main.temp_min)}℃`
}

function generateApiCall(position) {
  var lon = position.coords.longitude
  var lat = position.coords.latitude
  axios
    .get(`${weatherUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(showCurrentTemp)
}

function getCurrentUserGPS() {
  navigator.geolocation.getCurrentPosition(generateApiCall)
}

//display the date under the search bar
let now = new Date()
let displayDate = document.querySelector('#current-date')
displayDate.innerHTML = `${days[now.getDay()]} ${now.getDate()} ${
  months[now.getMonth()]
}, ${now.getFullYear()}`

//convert Fahrenheit to Celsius
function fToC(tempInF) {
  return Math.round((5 / 9) * (tempInF - 32))
}
//convert Celsuis to Fahrenheit
function cToF(tempInC) {
  return Math.round((tempInC * 9) / 5 + 32)
}
