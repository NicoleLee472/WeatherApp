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

let Dates = (function () {
  let currentDate = document.querySelector('#current-date')
  let currentDayAndTime = document.querySelector('#current-day-and-time')
  let now = new Date()
  let today = now.toLocaleDateString('en-AU', {})
  const optionsDayAndTime = {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    dayPeriod: 'narrow',
  }
  const optionsDate = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  let refreshDates = function () {
    currentDate.innerHTML = now.toLocaleDateString('en-AU', optionsDate)
    currentDayAndTime.innerHTML = now
      .toLocaleDateString('en-Au', optionsDayAndTime)
      .replace('night', 'pm')
      .replace('day', 'am')
  }

  return {
    displayDates: refreshDates,
    currentDay: now.getDay(),
  }
})()

Dates.displayDates()
