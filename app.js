// // console.log("welcome");
// // Initialize the Variables
let songindex = 0;
let audioElement = new Audio('songs/4 AM in Karachi.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songsItems = Array.from(document.getElementsByClassName('songItems'));
masterSongName = document.getElementById('masterSongName');
songDuration = document.getElementsByClassName('timestamp');

let songs = [
    {songName: "4 AM In Karachi", filePath: "songs/4 AM in Karachi.mp3", coverPath: "covers/4AM in Karachijpeg.jpeg"},
    {songName: "Baarishein", filePath: "songs/Baarishein.mp3", coverPath: "covers/barras.jpg"},
    {songName: "Khamoshiyan", filePath: "songs/Khamoshiyan.mp3", coverPath: "covers/Khamo.jpeg"},
    {songName: "Mini Maharani", filePath: "songs/Mini Maharani.mp3", coverPath: "covers/Mini Maharani.jpeg"},
    {songName: "Nanchaku", filePath: "songs/Nanchaku .mp3", coverPath: "covers/nanchaku.jpeg"}
];
songsItems.forEach((element, i) => {
    songDuration.innerText = songs[i].filePath.duration;
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause click
masterplay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterSongName.innerText = songs[songindex].songName;
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener("timeupdate", () => {
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myprogressBar.value = progress;
});

myprogressBar.addEventListener("change", () => {
    audioElement.currentTime = myprogressBar.value * audioElement.duration / 100;
});

const PlaySong = (index) =>{
    audioElement.src=songs[index].filePath;
    audioElement.currentTime=0;
    audioElement.play();
    masterSongName.innerText = songs[songindex].songName;
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
    gif.style.opacity=1;
}

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');

    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element,index) => {
    element.addEventListener('click', (e) => {
        console.log(index);
        makeAllPlays();
        songindex=index;
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        PlaySong(index);
    });
});

document.getElementById('next').addEventListener('click', () => {
    
    if (songindex >= songs.length - 1) {
        songindex = 0;
    } else {
        songindex += 1;
    }
    makeAllPlays();
    PlaySong(songindex);
    document.getElementsByClassName('songItemPlay')[songindex].classList.remove('fa-play');
    document.getElementsByClassName('songItemPlay')[songindex].classList.add('fa-pause');
});

document.getElementById('previous').addEventListener('click', () => {
    if (songindex <= 0) {
        songindex = songs.length - 1;
    } else {
        songindex -= 1;
    }
    makeAllPlays();
    PlaySong(songindex);
    document.getElementsByClassName('songItemPlay')[songindex].classList.remove('fa-play');
    document.getElementsByClassName('songItemPlay')[songindex].classList.add('fa-pause');
});