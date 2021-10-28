const allSongLists = [];
const state = {};

/**
 * After content loads, initialize state variables and delete data-songs from each 
 * album element. 
 */
window.addEventListener('DOMContentLoaded', event => {
    state.currentAlbumIndex = 0;
    state.initialGlideIndex = 5;
    state.finalGlideIndex = 9;
    const albums = Array.from(document.querySelectorAll('.albums__individual'));
    for (album of albums) {
        delete album.dataset.songs;
    }
});




