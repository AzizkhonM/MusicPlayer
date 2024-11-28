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
    "Overcast"
]

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
        
        document.getElementById("degree").innerHTML = `${currentWeather.temperature}°C`
        document.getElementById("weather_type").innerHTML = weather_types[currentWeather.weathercode]
        
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

/*document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audioPlayer");
    const playPauseButton = document.getElementById("playPauseButton");
    const timeSlider = document.getElementById("timeSlider");
    const currentTimeDisplay = document.getElementById("currentTime");
    const durationDisplay = document.getElementById("duration");

    playPauseButton.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playPauseButton.textContent = "Pause";
        } else {
            audio.pause();
            playPauseButton.textContent = "Play";
        }
    });

    audio.addEventListener("timeupdate", () => {
        timeSlider.value = (audio.currentTime / audio.duration) * 100;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener("loadedmetadata", () => {
        timeSlider.max = 100;
        durationDisplay.textContent = formatTime(audio.duration);
    });

    timeSlider.addEventListener("input", () => {
        audio.currentTime = (timeSlider.value / 100) * audio.duration;
    });

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
        return `${mins}:${secs}`;
    }
});*/


/*fetch("../data/data.json").then(r=>r.text()).then(text => {
    console.log(JSON.parse(text))
})*/