const allSongLists = [];
const allAlbums = [];
const state = {};

/** Obtain songs from each album, delete dataset from each tag */
window.addEventListener('DOMContentLoaded', event => {
    const albums = Array.from(document.querySelectorAll('.albums__individual'));
    for (album of albums) {
        allAlbums.push({
            cover_photo_url: album.querySelector('img').src,
            id: parseInt(album.dataset.albumid),
            artist_name: album.querySelector('.artist__name').textContent,
            album_name: album.querySelector('.album__name').textContent
        });
        const songs = JSON.parse(album.dataset.songs);
        allSongLists.push(songs);
        delete album.dataset.songs;
    }
    state.currentAlbumIndex = 2;
});

// hover effects
const songs = Array.from(document.querySelectorAll('.songlist__individual'));
 
for (const song of songs) {
    song.addEventListener('mouseenter', () => {
        song.classList.add('songlist__individual--hover');
        song.querySelector('.album__song--name').classList.add('album__song--name-hover');
        song.querySelector('.song__favorite--select').classList.add('song__favorite--select-hover');
        const categories = Array.from(song.querySelectorAll('.album__song--categories span'));
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

const favoriteStars = Array.from(document.querySelectorAll('.song__favorite--select'));

favoriteStars.forEach(star => {
    star.addEventListener('mouseenter', () => {
        star.parentNode.querySelector('.song__favorite--popup').classList.add('song__favorite--popup-hover');
    });
    star.addEventListener('mouseleave', () => {
        star.parentNode.querySelector('.song__favorite--popup').classList.remove('song__favorite--popup-hover');
    });
    star.addEventListener('click', () => {
        star.classList.toggle('song__favorite--selected');
        // persist data in localstorage or backend db
        // let trackNumber = star.parentNode.querySelector('.album__track--number span');
        // trackNumber = parseInt(trackNumber.textContent);
        // const matchingSong = allSongLists[state.currentAlbumIndex].find(song => {
        //     return song.song_order === trackNumber;
        // });
    });
    // star.addEventListener('mouseenter', () => {
        
    // });
});



