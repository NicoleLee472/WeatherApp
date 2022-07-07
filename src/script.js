let HelperFunctions = (function () {
  let titleCase = function (str) {
    return str
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  return {
    toTitleCase: titleCase,
  }
})()

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
  let currentDay = now().getDay()

  const optionsDate = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const optionsDayAndTime = {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
  }

  let refreshDates = function () {
    let currentTime = now()
    currentDate.innerHTML = currentTime.toLocaleDateString('en-AU', optionsDate)
    currentDayAndTime.innerHTML = currentTime
      .toLocaleDateString('en-Au', optionsDayAndTime)
      .replace(',', ' ')
    currentDay = currentTime.getDay()
  }
  refreshDates()
  return {
    displayDates: refreshDates,
    currentDayNumeric: currentDay,
  }
})()

let SearchResults = (function () {
  const apiKey = '18e21a300ebbb03dff744f074bc3f64f'
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?`

  let mutateElements = {
    chosenCity: document.querySelector('#chosenCity'),
    stateAndCountry: document.querySelector('#stateAndCountry'),
    currentWeatherEmoji: document.querySelector('#currentWeatherEmoji'),
    currentHumidity: document.querySelector('#currentHumidity'),
    currentWind: document.querySelector('#currentWind'),
    currentDescription: document.querySelector('#currentDescription'),
    currentRain: document.querySelector('#currentRain'),
  }

  let actionElements = {
    requestedCity: document.querySelector('#requestedCity'),
    searchFormSubmission: document.querySelector('form'),
  }

  let showCurrentData = function (response) {
    Temperatures.setDegreesCelsius(response.data.main.temp)

    mutateElements.chosenCity.innerHTML = response.data.name
    mutateElements.stateAndCountry.innerHTML = response.data.sys.country
    mutateElements.currentWeatherEmoji.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    mutateElements.currentWeatherEmoji.alt = HelperFunctions.toTitleCase(
      response.data.weather[0].description
    )
    mutateElements.currentHumidity.innerHTML = response.data.main.humidity
    mutateElements.currentWind.innerHTML = Math.round(response.data.wind.speed)
    mutateElements.currentRain.innerHTML = response.rain
    mutateElements.currentDescription.innerHTML = HelperFunctions.toTitleCase(
      response.data.weather[0].description
    )
  }

  let searchApiCall = function (event) {
    event.preventDefault()
    axios
      .get(
        `${weatherUrl}q=${actionElements.requestedCity.value}&appid=${apiKey}&units=metric`
      )
      .then(showCurrentData)
  }

  actionElements.searchFormSubmission.addEventListener('submit', searchApiCall)
})()
