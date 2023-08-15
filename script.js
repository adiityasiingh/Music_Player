console.log('Welcome to Spotify')
document.addEventListener('DOMContentLoaded', () => {
    //initialize the variables
    let songIndex = 0;
    let audioElement = new Audio('songs/1.mp3');
    let masterPlay = document.getElementById('masterPlay');
    let songItemPlay = document.getElementById('songItemPlay');
    let myProgressBar = document.getElementById('myProgressBar');
    let gif = document.getElementById('gif');
    let masterSongName = document.getElementById('masterSongName');
    let songItem = Array.from(document.getElementsByClassName('songItem'));

    let songs = [
        { songName: "Tu bemisaal hai", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
        { songName: "Teri ky misaal du", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
        { songName: "Asmaan se aai hai", filePath: "songs/3.mp3", coverPath: "covers/3.jpeg" },
        { songName: "Yahi kehke taal du", filePath: "songs/4.mp3", coverPath: "covers/4.png" },
        { songName: "Bitch", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" }
    ]

    // async function getSongs() {
    //     songResponse = await fetch("api");
    //     songs = await songResponse.json()
    // }

    songItem.forEach((element, i) => {
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
    })


    //audioElement.play()

    //Handle Play/Paude Clicks
    masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
        else {
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;

        }
    })

    function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${formattedMinutes}:${formattedSeconds}`;
    }
    //Listen to Events

    audioElement.addEventListener('timeupdate', () => {

        //Update Seekbar
        progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;

        // Display the current time and duration for the song being played
        const currentTime = audioElement.currentTime;
        const duration = audioElement.duration;
        const currentTimeFormatted = formatTime(currentTime);
        const durationFormatted = formatTime(duration);

        // Update the current time and duration elements
        document.getElementById('currentTime').textContent = currentTimeFormatted;
        document.getElementById('duration').textContent = durationFormatted;
    });


    myProgressBar.addEventListener('change', () => {
        audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
    })

    const makeAllPlays = () => {
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        })
    }




    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.addEventListener('click', (e) => {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            if (audioElement.paused) {
                // Start playing the song
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                audioElement.src = `songs/${songIndex + 1}.mp3`;
                masterSongName.innerHTML = songs[songIndex].songName;
                audioElement.currentTime = 0;
                audioElement.play();
                gif.style.opacity = 1;
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
            } else {
                // Pause the song

                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
                audioElement.pause();
                gif.style.opacity = 0;
                // start audio which is clicked

                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                audioElement.src = `songs/${songIndex + 1}.mp3`;
                masterSongName.innerHTML = songs[songIndex].songName;
                audioElement.currentTime = 0;
                audioElement.play();
                gif.style.opacity = 1;
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');


            }
        })
    })



    document.getElementById('next').addEventListener('click', () => {
        if (songIndex >= 4) {
            songIndex = 0
        }
        else {
            songIndex += 1;
        }

        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerHTML = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })

    document.getElementById('previous').addEventListener('click', () => {
        if (songIndex <= 0) {
            songIndex = 0
        }
        else {
            songIndex -= 1;
        }

        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerHTML = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

    })


});