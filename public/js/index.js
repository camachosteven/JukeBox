const allSongLists = [];

/** Obtain songs from each album, delete dataset from each tag */
window.addEventListener('DOMContentLoaded', event => {
    const albums = Array.from(document.querySelectorAll('.albums__individual'));
    for (album of albums) {
        const songs = JSON.parse(album.dataset.songs);
        allSongLists.push(songs);
        delete album.dataset.songs;
        console.log(songs);
    }
});


