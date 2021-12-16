function formatTime(timestamp) {
  let date = new Date(timestamp)
  let hours = date.getHours()
  if (hours < 10) {
    hours = `0${hours}`
  }
  let minutes = date.getMinutes()
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  let day = days[date.getDay()]
  return `${day} ${hours}:${minutes}`
}

// function formatDay(timestamp) {
//   let date = new Date(timestamp * 1000)
//   let day = date.getDay()
//   let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

//   return days[day]
// }

function showWeather(response) {
  let temp = Math.round(response.data.main.temp)
  let description = response.data.weather[0].description
  let windSpeed = response.data.wind.speed
  let humidity = response.data.main.humidity
  // let icon = response.data.weather[0].icon;
  // var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";

  let currentTemp = document.querySelector('#temperature')
  let weatherDescription = document.querySelector('.weather')
  let currentWindSpeed = document.querySelector('#wind-speed')
  let currentHumidity = document.querySelector('#humidity')
  let timeElement = document.querySelector('h3')
  let weatherIcon = document.querySelector('#icon')

  currentTemp.innerHTML = temp
  weatherDescription.innerHTML = description
  currentWindSpeed.innerHTML = windSpeed
  currentHumidity.innerHTML = humidity
  timeElement.innerHTML = formatTime(response.data.dt * 1000)
  weatherIcon.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
  )
  weatherIcon.setAttribute('alt', response.data.weather[0].description)
}

function searchForCity(event) {
  event.preventDefault()
  let city = document.querySelector('#input')
  let country = document.querySelector('h2')

  let apiKey = '9402fdeb43e1bddf29be4a16f4625ef0'
  let url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city.value +
    '&appid=' +
    apiKey +
    '&units=metric'

  if (city !== undefined) {
    let h1 = document.querySelector('h1')
    h1.innerHTML = city.value
    country.innerHTML = ' '
    axios.get(url).then(showWeather)
  } else {
    city = null
    alert('Please enter a city name.')
  }
}

let submitButton = document.querySelector('#input-form')
submitButton.addEventListener('submit', searchForCity)

function showCurrentWeather(response) {
  let h1 = document.querySelector('h1')
  let h2 = document.querySelector('h2')
  let city = response.data.name
  let country = response.data.sys.country

  h1.innerHTML = city
  h2.innerHTML = country

  showWeather(response)
}

function retrievePosition(position) {
  let apiKey = '3cc4089a402da308c73b760596562e2f'
  let lat = position.coords.latitude
  let lon = position.coords.longitude
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  axios.get(url).then(showCurrentWeather)
}

function getCurrentPosition(event) {
  event.preventDefault()
  navigator.geolocation.getCurrentPosition(retrievePosition)
}

let locationButton = document.querySelector('#location-button')
locationButton.addEventListener('click', getCurrentPosition)

function calculateToCelsius(temp) {
  let celsiusTemp = Math.round(((temp - 32) * 5) / 9)
  return celsiusTemp
}

function changeToCelsius(event) {
  event.preventDefault()
  let higherTemp = document.querySelector('#temperature-high-first').innerText
  let lowerTemp = document.querySelector('#temperature-low-first').innerText

  let celsiusTemperatureHigh = calculateToCelsius(higherTemp)
  document.querySelector(
    '#temperature-high-first',
  ).innerHTML = celsiusTemperatureHigh
  let celsiusTemperatureLow = calculateToCelsius(lowerTemp)
  document.querySelector(
    '#temperature-low-first',
  ).innerHTML = celsiusTemperatureLow
}

let changedTempCelsius = document.querySelector('#celsius')
changedTempCelsius.addEventListener('click', changeToCelsius)

function calculateToFarenheit(temp) {
  let farenheitTemp = Math.round((temp * 9) / 5 + 32)
  return farenheitTemp
}

function changeToFarenheit(event) {
  event.preventDefault()
  let higherTemp = document.querySelector('#temperature-high-first').innerText
  let lowerTemp = document.querySelector('#temperature-low-first').innerText

  let farenhajtTemperatureHigh = calculateToFarenheit(higherTemp)
  document.querySelector(
    '#temperature-high-first',
  ).innerHTML = farenhajtTemperatureHigh

  let farenhajtTemperatureLow = calculateToFarenheit(lowerTemp)
  document.querySelector(
    '#temperature-low-first',
  ).innerHTML = farenhajtTemperatureLow
}

let changedTempFarenheit = document.querySelector('#farenheit')
changedTempFarenheit.addEventListener('click', changeToFarenheit)
