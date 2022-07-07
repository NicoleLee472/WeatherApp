let HelperFunctions = (function () {
  let titleCase = function (str) {
    return str
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  //convert Celsuis to Fahrenheit
  function cToF(tempInC) {
    return Math.round((tempInC * 9) / 5 + 32)
  }

  function preventDefaultHelper(f) {
    return function (event) {
      event.preventDefault()
      f()
    }
  }

  return {
    toTitleCase: titleCase,
    convertToFahrenheit: cToF,
    preventDefault: preventDefaultHelper,
  }
})()

let Temperatures = (function () {
  let currentTemperature = document.querySelector('#currentTemperature')
  var celsius = 0
  var fahrenheit = 0
  var isCelsius = true

  let displayTemperatures = function () {
    if (isCelsius) {
      currentTemperature.innerHTML = Math.round(celsius)
    } else {
      currentTemperature.innerHTML = Math.round(fahrenheit)
    }
  }

  //this is like an API
  return {
    setCelsiusScale: function () {
      isCelsius = true
      ConvertTemperatures.chooseCelsius.setAttribute(
        'class',
        'temperatureScaleActive'
      )
      ConvertTemperatures.chooseFahrenheit.setAttribute(
        'class',
        'temperatureScaleInactive'
      )
      displayTemperatures()
    },
    setFahrenheitScale: function () {
      isCelsius = false
      ConvertTemperatures.chooseCelsius.setAttribute(
        'class',
        'temperatureScaleInactive'
      )
      ConvertTemperatures.chooseFahrenheit.setAttribute(
        'class',
        'temperatureScaleActive'
      )
      displayTemperatures()
    },
    setDegreesCelsius: function (degreesC) {
      celsius = degreesC
      fahrenheit = HelperFunctions.convertToFahrenheit(celsius)
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

  //elements to be changed
  chosenCity = document.querySelector('#chosenCity')
  stateAndCountry = document.querySelector('#stateAndCountry')
  currentWeatherEmoji = document.querySelector('#currentWeatherEmoji')
  currentHumidity = document.querySelector('#currentHumidity')
  currentWind = document.querySelector('#currentWind')
  currentDescription = document.querySelector('#currentDescription')
  currentRain = document.querySelector('#currentRain')
  todayBlock - document.querySelector('#todayBlock')

  //action elements
  requestedCity = document.querySelector('#requestedCity')
  searchFormSubmission = document.querySelector('form')

  let showCurrentData = function (response) {
    Temperatures.setDegreesCelsius(response.data.main.temp)

    chosenCity.innerHTML = response.data.name
    stateAndCountry.innerHTML = response.data.sys.country
    currentWeatherEmoji.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    currentWeatherEmoji.alt = HelperFunctions.toTitleCase(
      response.data.weather[0].description
    )
    currentHumidity.innerHTML = response.data.main.humidity
    currentWind.innerHTML = Math.round(response.data.wind.speed)
    currentDescription.innerHTML = HelperFunctions.toTitleCase(
      response.data.weather[0].description
    )
    todayBlock.hidden = false
  }

  //Search form
  let searchApiCall = function () {
    axios
      .get(`${weatherUrl}q=${requestedCity.value}&appid=${apiKey}&units=metric`)
      .then(showCurrentData)
  }

  searchFormSubmission.addEventListener(
    'submit',
    HelperFunctions.preventDefault(searchApiCall)
  )

  //current location
  let generateApiCall = function (position) {
    var lon = position.coords.longitude
    var lat = position.coords.latitude
    axios
      .get(`${weatherUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
      .then(showCurrentData)
  }

  let getCurrentUserGps = function () {
    navigator.geolocation.getCurrentPosition(generateApiCall)
  }

  let showCurrentLocationData = document.querySelector('#current-location')
  showCurrentLocationData.addEventListener(
    'click',
    HelperFunctions.preventDefault(getCurrentUserGps)
  )
})()

let ConvertTemperatures = (function () {
  let clickCelsius = document.querySelector('#temperatureScaleC')
  let clickFahrenheit = document.querySelector('#temperatureScaleF')

  clickFahrenheit.addEventListener(
    'click',
    HelperFunctions.preventDefault(Temperatures.setFahrenheitScale)
  )
  clickCelsius.addEventListener(
    'click',
    HelperFunctions.preventDefault(Temperatures.setCelsiusScale)
  )
  return {
    chooseCelsius: clickCelsius,
    chooseFahrenheit: clickFahrenheit,
  }
})()
