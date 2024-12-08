// GET LYRICS FROM TXT
function getLyrics(a){
    fetch(`../lyrics/${a}`).then(r=>r.text()).then(text => {
        const Text = text.replace(/\n/g, '<br>');
        document.querySelector("#lyrics_text").innerHTML = Text
    })
}

const color = "#c57613"
let data = ""
let element = 0
let previousAgain = false

function main_filler(){

    function setBackgroundImage() {
        const div = document.querySelector('.music_background');
        if (window.innerWidth <= 640) {
          div.style.backgroundImage = `url(../img/vertBack/${data[element].vertBack})`;
          vinyl.style.display = "none"
        } else {
          div.style.backgroundImage = `url(../img/background/${data[element].background})`;
          vinyl.style.display = "block"
        }
      }
    // let element = Math.round(Math.random() * 19)
    // console.log(element);

    previousAgain = false
    if(element == -1){
        element = data.length-1
    }
    
    if(element == data.length){
        element = 0
    }
    
    getLyrics(data[element].lyrics)
    
    document.getElementById("artist").innerHTML = data[element].author
    document.getElementById("track").innerHTML = data[element].track
    document.getElementById("album").innerHTML = data[element].album
    document.getElementById("cover").src = `../img/cover/${data[element].cover}`
    document.querySelector(".music_background").style.backgroundImage = `url(../img/background/${data[element].background})`
    document.querySelector("audio").src = `../music/${data[element].audio}`
    setTimeout(() => {
        document.querySelector("#timeSlider").value = 0;
        document.querySelector("#timeSlider").max = 100;
    }, 100);
      
    setBackgroundImage();
      
    window.addEventListener('resize', setBackgroundImage);
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
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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
    
    document.getElementById("day").textContent =  `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`
}
updateTime()
setInterval(updateTime, 10000);

async function getWeather() {
    try {
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.375&longitude=69.25&current_weather=true");
        const data = await response.json();
        const currentWeather = data.current_weather;
        
        
        
        document.getElementById("degree").innerHTML = `${Number(String(currentWeather.temperature).split(".")[0])}°C`
        if(currentWeather.weathercode < 10){
            document.getElementById("weather_type").innerHTML = weather_types[currentWeather.weathercode]
        } else{
            document.getElementById("weather_type").innerHTML = weather_types[Number(String(currentWeather.weathercode)[0])]
        }
        
        console.log(`
Temperature: ${currentWeather.temperature}
Wind Speed: ${currentWeather.windspeed} km/h
Weather: ${currentWeather.weathercode}`)
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  getWeather();

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audioPlayer");
    const playPauseButton = document.getElementById("playPauseButton");
    const timeSlider = document.getElementById("timeSlider");
    const previousButton = document.getElementById("previousButton")
    const nextButton = document.getElementById("nextButton")

    playPauseButton.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playPauseButton.src = "/img/pause.svg"
            playPauseButton.style.width = "29px"
            vinyl.setAttribute("class", "rotating")
        } else {
            audio.pause();
            playPauseButton.src = "/img/play.svg"
            playPauseButton.style.width = "30px"
            vinyl.setAttribute("class", "rotatingg")
        }
    });

    previousButton.addEventListener("click", () => {
        if(audio.currentTime < 5 && previousAgain == false){
            audio.currentTime = 0
            previousAgain = true
        } else{
            element--
            main_filler()
            audio.play()
            playPauseButton.src = "/img/pause.svg"
            playPauseButton.style.width = "29px"
            vinyl.setAttribute("class", "rotating")
        }
    })

    nextButton.addEventListener("click", () => {
        element++
        main_filler()
        audio.play()
        playPauseButton.src = "/img/pause.svg"
        playPauseButton.style.width = "29px"
        vinyl.setAttribute("class", "rotating")
    })

    audio.addEventListener("timeupdate", () => {
        timeSlider.value = (audio.currentTime / audio.duration) * 100;
    });


    timeSlider.addEventListener("input", () => {
        audio.currentTime = (timeSlider.value / 100) * audio.duration;
    });

    audio.addEventListener("timeupdate", () => {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
      
        // Calculate progress percentage
        const progressPercent = (currentTime / duration) * 100;

        if(progressPercent == 100){
            element++
            main_filler()
            audio.play()
            playPauseButton.src = "/img/pause.svg"
            playPauseButton.style.width = "29px"
            vinyl.setAttribute("class", "rotating")
        }
        
      
        // Update the slider's value
        timeSlider.value = progressPercent;
      
        // Update the gradient background
        timeSlider.style.background = `linear-gradient(to right, ${color} ${progressPercent}%, #ccc ${progressPercent}%)`;
      });
});
  

fetch("../data/data.json").then(r=>r.text()).then(text => {
    data = JSON.parse(text)

    main_filler()
    
    const list = document.getElementById("card_list")
    for(let i of data){
        // console.log(i);

        /*let card = document.createElement("div")
        card.setAttribute("class", "card")
        
        let cover = document.createElement("img")
        cover.src = `../img/cover/${i.cover}`
        cover.setAttribute("class", "card_cover")
        cover.setAttribute("draggable", "false")
        card.appendChild(cover)*/

        let card2 = document.createElement("div")
        card2.setAttribute("class", "card2")
        card2.style.backgroundImage = `url(../img/cover/${i.cover})`
        card2.setAttribute("id", `song-${i.id}`)

        let gradient = document.createElement("div")
        gradient.setAttribute("class", "gradient2")
        card2.appendChild(gradient)

        let box = document.createElement("div")
        gradient.appendChild(box)

        let album = document.createElement("h1")
        album.innerHTML = i.album
        album.setAttribute("class", "card_album")
        box.appendChild(album)

        let track = document.createElement("h1")
        track.innerHTML = i.track
        track.setAttribute("class", "card_track")
        box.appendChild(track)

        let artist = document.createElement("h1")
        artist.innerHTML = i.author
        artist.setAttribute("class", "card_artist")
        box.appendChild(artist)

        list.appendChild(card2)
    }
})


setTimeout(() => {
    document.querySelectorAll('.card2').forEach(card => {
        card.addEventListener('click', function () {
            const audio = document.getElementById("audioPlayer");
            element = card.id.split("-")[1] - 1
            main_filler()
            audio.play()
            playPauseButton.src = "/img/pause.svg"
            playPauseButton.style.width = "29px"
            vinyl.setAttribute("class", "rotating")
            document.body.scrollIntoView({
                behavior: 'smooth'
              });
        });
      });
}, 100);



const gradient = document.querySelector(".gradient")
const height = gradient.offsetHeight;
gradient.style.marginTop = `-${height}px`;
