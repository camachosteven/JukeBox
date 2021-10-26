const allSongLists = [];

/** Obtain songs from each album, delete dataset from each tag */
window.addEventListener('DOMContentLoaded', event => {
    const albums = Array.from(document.querySelectorAll('.albums__individual'));
    for (album of albums) {
        const songs = JSON.parse(album.dataset.songs);
        allSongLists.push(songs);
        delete album.dataset.songs;
    }
});

// hover effects
const songs = Array.from(document.querySelectorAll('.songlist__individual'));
 
for (const song of songs) {
    song.addEventListener('mouseenter', () => {
        song.classList.add('songlist__individual--hover');
        song.querySelector('.album__song--name').classList.add('album__song--name-hover');
        song.querySelector('.song__favorite--select').classList.add('song__favorite--select-hover');
        const categories = Array.from(song.querySelectorAll('.album__song--categories span'));
        console.log(categories);
        categories.forEach(element => element.classList.add('album__song--categories-hover'));
        song.querySelector('.album__song--time').classList.add('album__song--time-hover');
    });
    song.addEventListener('mouseleave', () => {
        song.classList.remove('songlist__individual--hover');
        song.querySelector('.album__song--name').classList.remove('album__song--name-hover');
        song.querySelector('.song__favorite--select').classList.remove('song__favorite--select-hover');
        const categories = Array.from(song.querySelectorAll('.album__song--categories span'));
        categories.forEach(element => element.classList.remove('album__song--categories-hover'));
        song.querySelector('.album__song--time').classList.remove('album__song--time-hover');
    });
}



