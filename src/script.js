let Temperatures = (function () {
  let temperature = document.querySelector('#currentTemperature')
  var celsius = 0
  var fahrenheit = 0
  var isCelsius = true
  let displayTemperatures = function () {
    if (isCelsius) {
      temperature.innerHTML = Math.round(celsius)
    } else {
      temperature.innerHTML = Math.round(fahrenheit)
    }
  }
  //convert Fahrenheit to Celsius
  function fToC(tempInF) {
    return Math.round((5 / 9) * (tempInF - 32))
  }
  //convert Celsuis to Fahrenheit
  function cToF(tempInC) {
    return Math.round((tempInC * 9) / 5 + 32)
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

let Dates = (function () {
  let currentDate = document.querySelector('#current-date')
  let currentDayAndTime = document.querySelector('#currentDayAndTime')
  let now = function () {
    return new Date()
  }
  let currentDayNumeric = now().getDay

  const optionsDayAndTime = {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }
  const optionsDate = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  let refreshDates = function () {
    let currentTime = now()
    currentDate.innerHTML = currentTime.toLocaleDateString('en-AU', optionsDate)
    currentDayAndTime.innerHTML = currentTime
      .toLocaleDateString('en-Au', optionsDayAndTime)
      .replace(',', ' ')
    currentDayNumeric = now().getDay
  }
  refreshDates()
  return {
    displayDates: refreshDates,
    currentDay: currentDayNumeric,
  }
})()

let SearchResults = (function () {
  const apiKey = '18e21a300ebbb03dff744f074bc3f64f'
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?`

  let showCurrentData = function (response) {
    Temperatures.setDegreesCelsius(response.data.main.temp)

    chosenCity.innerHTML = response.data.name
    stateAndCountry.innerHTML = response.data.sys.country
    currentWeatherEmoji.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`
    currentWind.innerHTML = `Wind speed: ${response.data.wind.speed} m/s`
    currentDescription.innerHTML = response.data.weather[0].description
  }

  let requestedCity = document.querySelector('#requestedCity')

  let searchApiCall = function (event) {
    event.preventDefault()
    axios
      .get(`${weatherUrl}q=${requestedCity.value}&appid=${apiKey}&units=metric`)
      .then(showCurrentData)
  }
  let searchFormSubmission = document.querySelector('form')
  searchFormSubmission.addEventListener('submit', searchApiCall)
})()
