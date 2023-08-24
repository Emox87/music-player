const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

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

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// On load select first song
loadSong(songs[songIndex]);

