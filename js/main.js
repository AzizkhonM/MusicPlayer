// GET LYRICS FROM TXT
function getLyrics(a){
    fetch(`../lyrics/${a}.txt`).then(r=>r.text()).then(text => {
        const Text = text.replace(/\n/g, '<br>');
        document.getElementById("lyrics_text").innerHTML = Text
        
    })
}


const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Jule",
    "August",
    "September",
    "October",
    "November",
    "December"
]

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]

const weather_types = [
    "Clear sky",
    "Mainly clear",
    "Partly cloudy",
    "Overcast",
    "Fog",
    "Drizzle",
    "Rain",
    "Snow",
    "Rain/snow showers",
    "Thunderstorm"
]

const vinyl = document.getElementById("vinyl")

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0'); 
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('hourminute').textContent = `${hours}:${minutes}`;
    document.getElementById("day").textContent =  `${days[now.getDay() - 1]}, ${months[now.getMonth()]} ${now.getDate()}`
}
updateTime()
setInterval(updateTime, 30000);

async function getWeather() {
    try {
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.375&longitude=69.25&current_weather=true");
        const data = await response.json();
        const currentWeather = data.current_weather;
        
        document.getElementById("degree").innerHTML = `${Number(String(currentWeather.temperature)[0])}°C`
        if(currentWeather.weathercode < 10){
            document.getElementById("weather_type").innerHTML = weather_types[currentWeather.weathercode]
        } else{
            document.getElementById("weather_type").innerHTML = weather_types[Number(String(currentWeather.weathercode)[0])]
        }
        
        console.log(`
Temperature: ${currentWeather.temperature} <br>
Wind Speed: ${currentWeather.windspeed} km/h <br>
Weather: ${currentWeather.weathercode}`)
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  getWeather();

  document.getElementById("lyrics_text").innerHTML = getLyrics("BlindingLights")

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audioPlayer");
    const playPauseButton = document.getElementById("playPauseButton");
    const timeSlider = document.getElementById("timeSlider");

    playPauseButton.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playPauseButton.src = "/img/pause.svg"
            vinyl.setAttribute("class", "rotating")
        } else {
            audio.pause();
            playPauseButton.src = "/img/play.svg"
            vinyl.setAttribute("class", "rotatingg")
        }
    });

    audio.addEventListener("timeupdate", () => {
        timeSlider.value = (audio.currentTime / audio.duration) * 100;
    });


    timeSlider.addEventListener("input", () => {
        audio.currentTime = (timeSlider.value / 100) * audio.duration;
    });

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
        return `${mins}:${secs}`;
    }

    audio.addEventListener("timeupdate", () => {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
      
        // Calculate progress percentage
        const progressPercent = (currentTime / duration) * 100;
        console.log(progressPercent);
        
      
        // Update the slider's value
        timeSlider.value = progressPercent;
      
        // Update the gradient background
        timeSlider.style.background = `linear-gradient(to right, #00d6af ${progressPercent}%, #ccc ${progressPercent}%)`;
      });
});


fetch("../data/data.json").then(r=>r.text()).then(text => {
    const data = JSON.parse(text)

    const list = document.getElementById("card_list")
    for(let i of data){
        console.log(i);
        
        let card = document.createElement("div")
        card.setAttribute("class", "card")
        
        let cover = document.createElement("img")
        cover.src = `../img/cover/${i.cover}`
        cover.setAttribute("class", "card_cover")
        cover.setAttribute("draggable", "false")
        card.appendChild(cover)
        
        let artist = document.createElement("h1")
        artist.innerHTML = i.author
        artist.setAttribute("class", "card_artist")
        card.appendChild(artist)

        let track = document.createElement("h1")
        track.innerHTML = i.track
        track.setAttribute("class", "card_track")
        card.appendChild(track)

        let album = document.createElement("h1")
        album.innerHTML = i.album
        album.setAttribute("class", "card_album")
        card.appendChild(album)

        list.appendChild(card)
    }
})

