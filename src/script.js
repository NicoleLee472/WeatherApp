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

  let forecast1 = {
    dayName: document.querySelector('#forecastDay1'),
    emoji: document.querySelector('#forecastEmoji1'),
    forecastMin: document.querySelector('#forecastMin1'),
    forecastMax: document.querySelector('#forecastMax1'),
  }
  let forecast2 = {
    dayName: document.querySelector('#forecastDay2'),
    emoji: document.querySelector('#forecastEmoji2'),
    forecastMin: document.querySelector('#forecastMin2'),
    forecastMax: document.querySelector('#forecastMax2'),
  }
  let forecast3 = {
    dayName: document.querySelector('#forecastDay3'),
    emoji: document.querySelector('#forecastEmoji3'),
    forecastMin: document.querySelector('#forecastMin3'),
    forecastMax: document.querySelector('#forecastMax3'),
  }
  let forecast4 = {
    dayName: document.querySelector('#forecastDay4'),
    emoji: document.querySelector('#forecastEmoji4'),
    forecastMin: document.querySelector('#forecastMin4'),
    forecastMax: document.querySelector('#forecastMax4'),
  }
  let forecast5 = {
    dayName: document.querySelector('#forecastDay5'),
    emoji: document.querySelector('#forecastEmoji5'),
    forecastMin: document.querySelector('#forecastMin5'),
    forecastMax: document.querySelector('#forecastMax5'),
  }

  var forecastElementsArrayOfObjects = [{}, {}, {}, {}, {}]

  return {
    todayObj: todayObject,
    forecastDay1: forecast1,
    forecastDay2: forecast2,
    forecastDay3: forecast3,
    forecastDay4: forecast4,
    forecastDay5: forecast5,
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
    } else {
      Elements.todayObj.currentTemp.innerHTML = Fetch.todaysDataObj.currentTempF
      Elements.todayObj.maxTemp.innerHTML = Fetch.todaysDataObj.maxTempF
      Elements.todayObj.minTemp.innerHTML = Fetch.todaysDataObj.minTempF
    }
  }

  let displayForecastTemperatures = function () {
    if (isCelsius) {
      Elements.forecastDay1.forecastMax.innerHTML =
        Fetch.forecastDataArrOfObj[0].maxTempC
      Elements.forecastDay1.forecastMin.innerHTML =
        Fetch.forecastDataArrOfObj[0].minTempC

      Elements.forecastDay2.forecastMax.innerHTML =
        Fetch.forecastDataArrOfObj[1].maxTempC
      Elements.forecastDay2.forecastMin.innerHTML =
        Fetch.forecastDataArrOfObj[1].minTempC

      Elements.forecastDay3.forecastMax.innerHTML =
        Fetch.forecastDataArrOfObj[2].maxTempC
      Elements.forecastDay3.forecastMin.innerHTML =
        Fetch.forecastDataArrOfObj[2].minTempC

      Elements.forecastDay4.forecastMax.innerHTML =
        Fetch.forecastDataArrOfObj[3].maxTempC
      Elements.forecastDay4.forecastMin.innerHTML =
        Fetch.forecastDataArrOfObj[3].minTempC

      Elements.forecastDay5.forecastMax.innerHTML =
        Fetch.forecastDataArrOfObj[4].maxTempC
      Elements.forecastDay5.forecastMin.innerHTML =
        Fetch.forecastDataArrOfObj[4].minTempC
    } else {
      Elements.forecastDay1.forecastMax.innerHTML =
        Fetch.forecastDataArrOfObj[0].maxTempF
      Elements.forecastDay1.forecastMin.innerHTML =
        Fetch.forecastDataArrOfObj[0].minTempF

      Elements.forecastDay2.forecastMax.innerHTML =
        Fetch.forecastDataArrOfObj[1].maxTempF
      Elements.forecastDay2.forecastMin.innerHTML =
        Fetch.forecastDataArrOfObj[1].minTempF

      Elements.forecastDay3.forecastMax.innerHTML =
        Fetch.forecastDataArrOfObj[2].maxTempF
      Elements.forecastDay3.forecastMin.innerHTML =
        Fetch.forecastDataArrOfObj[2].minTempF

      Elements.forecastDay4.forecastMax.innerHTML =
        Fetch.forecastDataArrOfObj[3].maxTempF
      Elements.forecastDay4.forecastMin.innerHTML =
        Fetch.forecastDataArrOfObj[3].minTempF

      Elements.forecastDay5.forecastMax.innerHTML =
        Fetch.forecastDataArrOfObj[4].maxTempF
      Elements.forecastDay5.forecastMin.innerHTML =
        Fetch.forecastDataArrOfObj[4].minTempF
    }
  }

  let setCelsiusScale = function () {
    isCelsius = true
    clickCelsius.setAttribute('class', 'temperatureScaleActive')
    clickFahrenheit.setAttribute('class', 'temperatureScaleInactive')
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
  let currentDayOfMonth = now().getDate()

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
    currentDate: currentDayOfMonth,
  }
})()

let Fetch = (function () {
  const apiKey = '18e21a300ebbb03dff744f074bc3f64f'
  const todayWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?`
  const forecastWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?'

  //store todays weather from either search method
  let todayDataObj = {}

  let storeTodayWeatherData = function (response) {
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
  }

  var forecastArrOfObjects = []
  let todayDate = Dates.currentDate

  let storeForecastData = function (response) {
    console.log(response)
    var previousDate = 0
    for (let i = 0; i < response.data.cnt; i++) {
      let dateToTest = new Date(response.data.list[i].dt * 1000).getDate()
      if (dateToTest != todayDate) {
        if (dateToTest != previousDate) {
          forecastArrOfObjects.push({
            maxTemps: [response.data.list[i].main.temp_max],
            minTemps: [response.data.list[i].main.temp_min],
            emojis: [response.data.list[i].weather[0].icon],
          })
          previousDate = dateToTest
        } else {
          forecastArrOfObjects[forecastArrOfObjects.length - 1].maxTemps.push(
            response.data.list[i].main.temp_max
          )
          forecastArrOfObjects[forecastArrOfObjects.length - 1].minTemps.push(
            response.data.list[i].main.temp_min
          )
          forecastArrOfObjects[forecastArrOfObjects.length - 1].emojis.push(
            response.data.list[i].weather[0].icon
          )
        }
      }
    }
    storeMaxMinData()
  }

  let forecastDisplayData = []
  let storeMaxMinData = function () {
    for (let i = 0; i < forecastArrOfObjects.length; i++) {
      forecastDisplayData.push({
        maxTempC: Math.round(Math.max(...forecastArrOfObjects[i].maxTemps)),
        minTempC: Math.round(Math.min(...forecastArrOfObjects[i].minTemps)),
        emoji: `http://openweathermap.org/img/wn/${
          forecastArrOfObjects[i].emojis[
            Math.round(forecastArrOfObjects[i].emojis.length / 2)
          ]
        }@2x.png`,
      })
      forecastDisplayData[i].maxTempF = HelperFunctions.convertToFahrenheit(
        forecastDisplayData[i].maxTempC
      )
      forecastDisplayData[i].minTempF = HelperFunctions.convertToFahrenheit(
        forecastDisplayData[i].minTempC
      )
    }
    Display.forecastData()
  }

  //weather data for searched city
  let requestedCity = document.querySelector('#requestedCity')
  let searchWeatherApiCalls = function () {
    axios
      .get(
        `${todayWeatherUrl}q=${requestedCity.value}&appid=${apiKey}&units=metric`
      )
      .then(storeTodayWeatherData)
    axios
      .get(
        `${forecastWeatherUrl}q=${requestedCity.value}&appid=${apiKey}&units=metric`
      )
      .then(storeForecastData)
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
      .then(storeForecastData)
  }

  let getCurrentUserGps = function () {
    navigator.geolocation.getCurrentPosition(currentLocationApiCalls)
  }
  //return functions and objects for use in other crocks
  return {
    userGps: getCurrentUserGps,
    searchApiCall: searchWeatherApiCalls,
    todaysDataObj: todayDataObj,
    forecastDataArrOfObj: forecastDisplayData,
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

    Elements.forecastDay1.dayName.innerHTML =
      HelperFunctions.day[Dates.currentDayNumeric + 1]
    Elements.forecastDay1.emoji.src = Fetch.forecastDataArrOfObj[0].emoji

    Elements.forecastDay2.dayName.innerHTML =
      HelperFunctions.day[Dates.currentDayNumeric + 2]
    Elements.forecastDay2.emoji.src = Fetch.forecastDataArrOfObj[1].emoji

    Elements.forecastDay3.dayName.innerHTML =
      HelperFunctions.day[Dates.currentDayNumeric + 3]
    Elements.forecastDay3.emoji.src = Fetch.forecastDataArrOfObj[2].emoji

    Elements.forecastDay4.dayName.innerHTML =
      HelperFunctions.day[Dates.currentDayNumeric + 4]
    Elements.forecastDay4.emoji.src = Fetch.forecastDataArrOfObj[3].emoji

    Elements.forecastDay5.dayName.innerHTML =
      HelperFunctions.day[Dates.currentDayNumeric + 5]
    Elements.forecastDay5.emoji.src = Fetch.forecastDataArrOfObj[4].emoji

    forecastBlock.hidden = false
    Dates.displayDates()
  }
  return {
    todayData: showTodayData,
    forecastData: showForecastData,
  }
})()

/* let ChooseTempScale = (function () {
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
})() */

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
