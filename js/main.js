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


// GET LYRICS FROM TXT

/*fetch("../lyrics/LetItHappen.txt").then(r=>r.text()).then(text => {
    console.log(typeof text)
    let lyrics = document.getElementById("lyrics")
    const Text = text.replace(/\n/g, '<br>');
    lyrics.innerHTML = Text
    lyrics.style.fontFamily = "Consolas"
})*/