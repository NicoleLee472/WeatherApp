let HelperFunctions = (function () {
  let titleCase = function (str) {
    return str
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  //convert Celsuis to Fahrenheit
  function cToF(tempInC) {
    return (tempInC * 9) / 5 + 32
  }

  function preventDefaultHelper(f) {
    return function (event) {
      event.preventDefault()
      f()
    }
  }

  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return {
    toTitleCase: titleCase,
    convertToFahrenheit: cToF,
    preventDefault: preventDefaultHelper,
    day: days,
  }
})()

let Elements = (function () {
  let todayObject = {
    currentTemp: document.querySelector('#currentTemperature'),
    maxTemp: document.querySelector('#todayMax'),
    minTemp: document.querySelector('#todayMin'),
    emoji: document.querySelector('#currentWeatherEmoji'),
    humidity: document.querySelector('#currentHumidity'),
    wind: document.querySelector('#currentWind'),
    description: document.querySelector('#currentDescription'),
  }

  let forecastElementsArrayOfObjects = [{}, {}, {}, {}, {}]
  let storeForecastElements = function () {
    for (let i = 0; i < forecastElementsArrayOfObjects.length; i++) {
      forecastElementsArrayOfObjects[i].dayName = document.querySelector(
        `#forecastDay${i + 1}`
      )
      forecastElementsArrayOfObjects[i].emoji = document.querySelector(
        `#forecastEmoji${i + 1}`
      )
      forecastElementsArrayOfObjects[i].maxTemp = document.querySelector(
        `#forecastMin${i + 1}`
      )
      forecastElementsArrayOfObjects[i].minTemp = document.querySelector(
        `#forecastMax${i + 1}`
      )
    }
  }
  storeForecastElements()

  return {
    todayObj: todayObject,
    forecastArrObj: forecastElementsArrayOfObjects,
  }
})()

let Temperatures = (function () {
  var isCelsius = true

  let clickCelsius = document.querySelector('#temperatureScaleC')
  let clickFahrenheit = document.querySelector('#temperatureScaleF')

  let displayTodayTemperatures = function () {
    if (isCelsius) {
      Elements.todayObj.currentTemp.innerHTML = Fetch.todaysDataObj.currentTempC
      Elements.todayObj.maxTemp.innerHTML = Fetch.todaysDataObj.maxTempC
      Elements.todayObj.minTemp.innerHTML = Fetch.todaysDataObj.minTempC

      for (let i = 0; i < Elements.forecastArrObj.length; i++) {
        Elements.forecastArrObj[i].maxTemp.innerHTML =
          Fetch.forecastDataArrOfObj.maxTempC
        Elements.forecastArrObj[i].minTemp.innerHTML =
          Fetch.forecastDataArrOfObj.minTempC
      }
    } else {
      Elements.todayObj.currentTemp.innerHTML = Fetch.todaysDataObj.currentTempF
      Elements.todayObj.maxTemp.innerHTML = Fetch.todaysDataObj.maxTempF
      Elements.todayObj.minTemp.innerHTML = Fetch.todaysDataObj.minTempF

      for (let i = 0; i < Elements.forecastArrObj.length; i++) {
        Elements.forecastArrObj[i].maxTemp.innerHTML =
          Fetch.forecastDataArrOfObj.maxTempF
        Elements.forecastArrObj[i].minTemp.innerHTML =
          Fetch.forecastDataArrOfObj.minTempF
      }
    }
  }

  let displayForecastTemperatures = function () {
    if (isCelsius) {
      for (let i = 0; i < Elements.forecastArrObj.length; i++) {
        Elements.forecastArrObj[i].maxTemp.innerHTML =
          Fetch.forecastDataArrOfObj.maxTempC
        Elements.forecastArrObj[i].minTemp.innerHTML =
          Fetch.forecastDataArrOfObj.minTempC
      }
    } else {
      for (let i = 0; i < Elements.forecastArrObj.length; i++) {
        Elements.forecastArrObj[i].maxTemp.innerHTML =
          Fetch.forecastDataArrOfObj.maxTempF
        Elements.forecastArrObj[i].minTemp.innerHTML =
          Fetch.forecastDataArrOfObj.minTempF
      }
    }
  }

  let setCelsiusScale = function () {
    isCelsius = true
    ChooseTempScale.celsius.setAttribute('class', 'temperatureScaleActive')
    ChooseTempScale.fahrenheit.setAttribute('class', 'temperatureScaleInactive')
    displayTodayTemperatures()
    displayForecastTemperatures()
  }

  let setFahrenheitScale = function () {
    isCelsius = false
    clickCelsius.setAttribute('class', 'temperatureScaleInactive')
    clickFahrenheit.setAttribute('class', 'temperatureScaleActive')
    displayTodayTemperatures()
    displayForecastTemperatures()
  }

  clickFahrenheit.addEventListener(
    'click',
    HelperFunctions.preventDefault(setFahrenheitScale)
  )
  clickCelsius.addEventListener(
    'click',
    HelperFunctions.preventDefault(setCelsiusScale)
  )

  //this is like an API
  return {
    displayTodayTemps: displayTodayTemperatures,
    displayForecastTemps: displayForecastTemperatures,
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

let Fetch = (function () {
  const apiKey = '18e21a300ebbb03dff744f074bc3f64f'
  const todayWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?`
  const forecastWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?'

  //store todays weather from either search method
  let todayDataObj = {}

  let storeTodayWeatherData = function (response) {
    console.log(response)
    todayDataObj.city = response.data.name
    todayDataObj.country = response.data.sys.country
    todayDataObj.emoji = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    todayDataObj.humidity = response.data.main.humidity
    todayDataObj.wind = Math.round(response.data.wind.speed)
    todayDataObj.description = HelperFunctions.toTitleCase(
      response.data.weather[0].description
    )
    todayDataObj.currentTempC = Math.round(response.data.main.temp)
    todayDataObj.maxTempC = Math.round(response.data.main.temp_max)
    todayDataObj.minTempC = Math.round(response.data.main.temp_min)
    todayDataObj.feelsLikeC = Math.round(response.data.main.feels_like)
    todayDataObj.currentTempF = Math.round(
      HelperFunctions.convertToFahrenheit(response.data.main.temp)
    )
    todayDataObj.maxTempF = Math.round(
      HelperFunctions.convertToFahrenheit(response.data.main.temp_max)
    )
    todayDataObj.minTempF = Math.round(
      HelperFunctions.convertToFahrenheit(response.data.main.temp_min)
    )
    todayDataObj.feelsLikeTempF = Math.round(
      HelperFunctions.convertToFahrenheit(response.data.main.feels_like)
    )
    Display.todayData()
    console.log(todayDataObj)
  }

  //store forecast data from either search method
  let forecastWeatherDataArrayOfObjects = [{}, {}, {}, {}, {}]

  let storeForecastWeatherData = function (response) {
    console.log(response)
    for (let i = 0; i < forecastWeatherDataArrayOfObjects.length; i++) {
      forecastWeatherDataArrayOfObjects[
        i
      ].emoji = `http://openweathermap.org/img/wn/${response.data.list[i].weather[0].icon}@2x.png`
      forecastWeatherDataArrayOfObjects[i].humidity =
        response.data.list[i].main.humidity
      forecastWeatherDataArrayOfObjects[i].wind = Math.round(
        response.data.list[i].wind.speed
      )
      forecastWeatherDataArrayOfObjects[i].description =
        HelperFunctions.toTitleCase(
          response.data.list[i].weather[0].description
        )
      forecastWeatherDataArrayOfObjects[i].currentTempC = Math.round(
        response.data.list[i].main.temp
      )
      forecastWeatherDataArrayOfObjects[i].maxTempC = Math.round(
        response.data.list[i].main.temp_max
      )
      forecastWeatherDataArrayOfObjects[i].minTempC = Math.round(
        response.data.list[i].main.temp_min
      )
      forecastWeatherDataArrayOfObjects[i].feelsLikeC = Math.round(
        response.data.list[i].main.feels_like
      )
      forecastWeatherDataArrayOfObjects[i].currentTempF = Math.round(
        HelperFunctions.convertToFahrenheit(response.data.list[i].main.temp)
      )
      forecastWeatherDataArrayOfObjects[i].maxTempF = Math.round(
        HelperFunctions.convertToFahrenheit(response.data.list[i].main.temp_max)
      )
      forecastWeatherDataArrayOfObjects[i].minTempF = Math.round(
        HelperFunctions.convertToFahrenheit(response.data.list[i].main.temp_min)
      )
      forecastWeatherDataArrayOfObjects[i].feelsLikeF = Math.round(
        HelperFunctions.convertToFahrenheit(
          response.data.list[i].main.feels_like
        )
      )
      Display.forecastData()
    }
    console.log(forecastWeatherDataArrayOfObjects)
  }

  //weather data for searched city
  let requestedCity = document.querySelector('#requestedCity')
  let searchWeatherApiCall = function () {
    axios
      .get(
        `${todayWeatherUrl}q=${requestedCity.value}&appid=${apiKey}&units=metric`
      )
      .then(storeTodayWeatherData)
    axios
      .get(
        `${forecastWeatherUrl}q=${requestedCity.value}&appid=${apiKey}&units=metric`
      )
      .then(storeForecastWeatherData)
  }
  //current location using browser lat and lon

  let currentLocationApiCalls = function (position) {
    var lon = position.coords.longitude
    var lat = position.coords.latitude
    axios
      .get(
        `${todayWeatherUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      )
      .then(storeTodayWeatherData)
    axios
      .get(
        `${forecastWeatherUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      )
      .then(storeForecastWeatherData)
  }

  let getCurrentUserGps = function () {
    navigator.geolocation.getCurrentPosition(currentLocationApiCalls)
  }
  //return functions and objects for use in other crocks
  return {
    userGps: getCurrentUserGps,
    searchApiCall: searchWeatherApiCall,
    todaysDataObj: todayDataObj,
    forecastDataArrOfObj: forecastWeatherDataArrayOfObjects,
  }
})()

let Search = (function () {
  //event listener for search results weather search
  searchFormSubmission = document.querySelector('form')
  searchFormSubmission.addEventListener(
    'submit',
    HelperFunctions.preventDefault(Fetch.searchApiCall)
  )
  //event listener for current gps location weather search
  let showCurrentLocationData = document.querySelector('#current-location')
  showCurrentLocationData.addEventListener(
    'click',
    HelperFunctions.preventDefault(Fetch.userGps)
  )
})()

let ChooseTempScale = (function () {
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
    celsius: clickCelsius,
    fahrenheit: clickFahrenheit,
  }
})()

/* let PageBackground = (function () {
  let changeBackground = function (response) {
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundImage = `url('${response.data.url}')`
  }

  axios
    .get(
      'https://api.nasa.gov/planetary/apod?api_key=dMXgU9tfrbn6VvKiYo4jnOhZtHTiC0ZMyjGmrsqg'
    )
    .then(changeBackground)
})() */

let Display = (function () {
  //elements to be changed
  let chosenCity = document.querySelector('#chosenCity')
  let country = document.querySelector('#country')

  //this element shows or hides the weather data blocks
  let todayBlock = document.querySelector('#todayBlock')
  let forecastBlock = document.querySelector('#forecastBlock')

  //function to display weather data
  let showTodayData = function () {
    Temperatures.displayTodayTemps()
    chosenCity.innerHTML = Fetch.todaysDataObj.city
    country.innerHTML = Fetch.todaysDataObj.country
    Elements.todayObj.emoji.src = Fetch.todaysDataObj.emoji
    Elements.todayObj.emoji.alt = Fetch.todaysDataObj.description
    Elements.todayObj.humidity.innerHTML = Fetch.todaysDataObj.humidity
    Elements.todayObj.wind.innerHTML = Fetch.todaysDataObj.wind
    Elements.todayObj.description.innerHTML = Fetch.todaysDataObj.description
    todayBlock.hidden = false
    Dates.displayDates()
  }

  let showForecastData = function () {
    Temperatures.displayForecastTemps()
    for (let i = 0; i < Elements.forecastArrObj.length; i++) {
      Elements.forecastArrObj[i].dayName =
        HelperFunctions.day[Dates.currentDayNumeric + i + 3]
      Elements.forecastArrObj[i].emoji = Fetch.forecastDataArrOfObj[i].emoji
    }
    forecastBlock.hidden = false
    Dates.displayDates()
  }
  return {
    todayData: showTodayData,
    forecastData: showForecastData,
  }
})()
