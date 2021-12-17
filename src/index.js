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

function showWeather(response) {
  celsiusTemperature = response.data.main.temp
  let temp = Math.round(celsiusTemperature)
  let description = response.data.weather[0].description
  let windSpeed = response.data.wind.speed
  let humidity = response.data.main.humidity
  let country = response.data.sys.country

  let currentTemp = document.querySelector('#temperature')
  let weatherDescription = document.querySelector('.weather')
  let currentWindSpeed = document.querySelector('#wind-speed')
  let currentHumidity = document.querySelector('#humidity')
  let timeElement = document.querySelector('h3')
  let weatherIcon = document.querySelector('#icon')
  let currentCountry = document.querySelector('h2')

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
  currentCountry.innerHTML = country
}

function searchForCity(city) {
  let apiKey = '9402fdeb43e1bddf29be4a16f4625ef0'
  let url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    city +
    '&appid=' +
    apiKey +
    '&units=metric'

  if (city !== undefined) {
    let h1 = document.querySelector('h1')
    h1.innerHTML = city
    axios.get(url).then(showWeather)
  } else {
    city = null
    alert('Please enter a city name.')
  }
}

function handleSubmit(event) {
  event.preventDefault()
  let city = document.querySelector('#input')
  searchForCity(city.value)
}

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

function changeToCelsius(event) {
  event.preventDefault()
  changedTempCelsius.classList.add('active')
  changedTempFarenheit.classList.remove('active')
  let temp = document.querySelector('#temperature')
  temp.innerHTML = Math.round(celsiusTemperature)
}

function changeToFarenheit(event) {
  event.preventDefault()
  let temp = document.querySelector('#temperature')
  changedTempCelsius.classList.remove('active')
  changedTempFarenheit.classList.add('active')
  let farenhajtTemperatureHigh = Math.round((celsiusTemperature * 9) / 5 + 32)
  temp.innerHTML = farenhajtTemperatureHigh
}
let celsiusTemperature = null
let submitButton = document.querySelector('#input-form')
submitButton.addEventListener('submit', handleSubmit)

let locationButton = document.querySelector('#location-button')
locationButton.addEventListener('click', getCurrentPosition)
let changedTempCelsius = document.querySelector('#celsius')
changedTempCelsius.addEventListener('click', changeToCelsius)

let changedTempFarenheit = document.querySelector('#farenheit')
changedTempFarenheit.addEventListener('click', changeToFarenheit)

searchForCity('New York')
