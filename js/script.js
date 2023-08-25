const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const volumeUpBtn = document.getElementById('volume-up-btn');
const volumeDownBtn = document.getElementById('volume-down-btn');
const volumeLineContainer = document.getElementById('volume-line-container');
const volumeBar = document.getElementById('volume-bar');

// Music
const songs = [
    {
        name: 'Avore-Aura',
        displayName: 'Aura',
        artist: 'Avore'
    },
    {
        name: 'Bamba-Lamer_Bite',
        displayName: 'Bite',
        artist: 'Bamba Lamer'
    },
    {
        name: 'Bamba-Lamer-Day-And-Night',
        displayName: 'Day and night',
        artist: 'Bamba Lamer'
    },
    {
        name: 'Bamba-Lamer-Subwalk',
        displayName: 'Subwalk',
        artist: 'Bamba Lamer'
    },
    {
        name: 'DJ-Pantelis-feat-Zara-Dle-Yaman-Original-Mix',
        displayName: 'House Mix',
        artist: 'DJ Pantelis'
    },
    {
        name: 'Gianluca-Vacchi-Viento',
        displayName: 'Viento',
        artist: 'Gianluca Vacchi'
    },
    {
        name: 'Gustavo-Santaolalla-Babel-Otnicka-Remix',
        displayName: 'Babel (Otnika Remix)',
        artist: 'Gustavo Santaolalla'
    },
    {
        name: 'Hraach-Amapola',
        displayName: 'Amapola',
        artist: 'Hraach'
    },
    {
        name: 'Living-The-Moment-Original-Mix',
        displayName: 'Living the moment',
        artist: 'Vinylsurfer'
    },
    {
        name: 'Luxurious-Elegant-Deep-House-Mix',
        displayName: 'Deep House (Mix)',
        artist: 'Luxurious Elegant'
    },
    {
        name: 'Misunderstood',
        displayName: 'Misunderstood',
        artist: 'Miguel Migs'
    },
    {
        name: 'SevenDoors-Movement-of-Whale-Solomun-Boiler-Room-Set',
        displayName: 'Movement of Whale',
        artist: 'Seven Doors'
    },
    {
        name: 'She-Original-Mix',
        displayName: 'She (Original Mix)',
        artist: 'Joseph Chain'
    },
    {
        name: 'Space-Train-Rishi-K',
        displayName: 'Space Train',
        artist: 'Rishi K'
    },
    {
        name: 'The-Gates-Of-Babylon-DAVI-Original-Mix',
        displayName: 'The Gates of Babylon',
        artist: 'Davi'
    }
];

// Check if playing
let isPlaying = false;

// Check if music volume muted
let isVolumeMuted = false;

// Current Song
let songIndex = 0;


// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Update the DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Next Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update Progressbar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const {
            duration,
            currentTime
        } = e.srcElement;

        // Update progressbar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate display for currentTime
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set progress bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {
        duration
    } = music;
    music.currentTime = (clickX / width) * duration;
}

// Mute volume
function muteVolume() {
    isVolumeMuted = true;
    volumeDownBtn.classList.replace('fa-volume-down', 'fa-volume-mute');
    volumeDownBtn.setAttribute('title', 'remove mute');
    music.volume = 0;
    updateVolumeProgressBar(0);
}

// Set volume
function setVolume(volumeLevel) {
   if (isVolumeMuted) {
    isVolumeMuted = false;
    volumeDownBtn.classList.replace('fa-volume-mute', 'fa-volume-down');
   }
   music.volume = volumeLevel;
   updateVolumeProgressBar(volumeLevel);
}



// Set volume progress bar
function setVolumeProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const volumePercent = Math.floor(clickX / width * 100);
    setVolume(volumePercent * 0.01);
    updateVolumeProgressBar(clickX/100);
}

// Update volume progress bar
function updateVolumeProgressBar(level) {
    volumeBar.style.width = `${level*100}%`;
} 

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
volumeDownBtn.addEventListener('click', () => isVolumeMuted ? setVolume(0.3) : muteVolume());
volumeUpBtn.addEventListener('click', () => (isVolumeMuted ? setVolume(0.3) : setVolume(1)));
volumeLineContainer.addEventListener('click', setVolumeProgressBar);

// On load select first song
loadSong(songs[songIndex]);

