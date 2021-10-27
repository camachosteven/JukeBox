const allSongLists = [];
const allAlbums = [];
const state = {};

/** Obtain songs from each album, delete dataset from each tag */
window.addEventListener('DOMContentLoaded', event => {
    const albums = Array.from(document.querySelectorAll('.albums__individual'));
    const noDuplicateAlbums = albums.slice(5, albums.length / 3);
    for (album of noDuplicateAlbums) {
        allAlbums.push(album);
        // const songs = JSON.parse(album.dataset.songs);
        // allSongLists.push(songs);
        // delete album.dataset.songs;
    }
    state.currentAlbumIndex = 0;
    state.initialGlideIndex = 5;
    state.finalGlideIndex = 9;
});

const previousArrow = document.querySelector('.previous__arrow');
const nextArrow = document.querySelector('.next__arrow');

const classes = [
    "albums__individual-main",
    "albums__individual-right-of-main",
    "albums__individual-right-end",
    "albums__individual-left-end",
    "albums__individual-left-of-main"
];

previousArrow.addEventListener('click', event => {
    const allAlbumClones = Array.from(document.querySelectorAll('.albums__individual'));
    console.log(allAlbumClones);
    const glideActiveIndex = allAlbumClones.findIndex(album => {
        const classesAsArray = Array.from(album.classList);
        return classesAsArray.find(className => className === 'glide__slide--active');
    });
    if (state.glideActiveIndex !== glideActiveIndex) {
        state.glideActiveIndex = glideActiveIndex; 
        for (let i = 0; i < allAlbumClones.length; i++) {
            const classesAsArray = Array.from(allAlbumClones[i].classList);
            const oldClass = classesAsArray.find(className => {
                const endRegex = new RegExp(/end$/);
                const mainRegex = new RegExp(/main$/);
                return endRegex.test(className) || mainRegex.test(className)
            });
            const newClass = classes.find((className, index) => {
                if (index === 0) {
                    return classes[classes.length - 1] === oldClass
                } else {
                    return classes[index - 1] === oldClass
                }
            });
            allAlbumClones[i].classList.remove(oldClass);
            allAlbumClones[i].classList.add(newClass);
        }
    }
});

nextArrow.addEventListener('click', event => {
    const allAlbumClones = Array.from(document.querySelectorAll('.albums__individual'));
    const glideActiveIndex = allAlbumClones.findIndex(album => {
        const classesAsArray = Array.from(album.classList);
        return classesAsArray.find(className => className === 'glide__slide--active');
    });
    if (state.glideActiveIndex !== glideActiveIndex) {
        state.glideActiveIndex = glideActiveIndex; 
        for (let i = 0; i < allAlbumClones.length; i++) {
            const classesAsArray = Array.from(allAlbumClones[i].classList);
            const oldClass = classesAsArray.find(className => {
                const endRegex = new RegExp(/end$/);
                const mainRegex = new RegExp(/main$/);
                return endRegex.test(className) || mainRegex.test(className)
            });
            const newClass = classes.find((className, index) => {
                if (index === classes.length - 1) {
                    return classes[0] === oldClass
                } else {
                    return classes[index + 1] === oldClass
                }
            });
            allAlbumClones[i].classList.remove(oldClass);
            allAlbumClones[i].classList.add(newClass);
            console.log(allAlbumClones[i]);
        }
    }
});

// // hover effects
// const songs = Array.from(document.querySelectorAll('.songlist__individual'));
 
// for (const song of songs) {
//     song.addEventListener('mouseenter', () => {
//         song.classList.add('songlist__individual--hover');
//         song.querySelector('.album__song--name').classList.add('album__song--name-hover');
//         song.querySelector('.song__favorite--select').classList.add('song__favorite--select-hover');
//         const categories = Array.from(song.querySelectorAll('.album__song--categories span'));
//         categories.forEach(element => element.classList.add('album__song--categories-hover'));
//         song.querySelector('.album__song--time').classList.add('album__song--time-hover');
//     });
//     song.addEventListener('mouseleave', () => {
//         song.classList.remove('songlist__individual--hover');
//         song.querySelector('.album__song--name').classList.remove('album__song--name-hover');
//         song.querySelector('.song__favorite--select').classList.remove('song__favorite--select-hover');
//         const categories = Array.from(song.querySelectorAll('.album__song--categories span'));
//         categories.forEach(element => element.classList.remove('album__song--categories-hover'));
//         song.querySelector('.album__song--time').classList.remove('album__song--time-hover');
//     });
// }

// const favoriteStars = Array.from(document.querySelectorAll('.song__favorite--select'));

// favoriteStars.forEach(star => {
//     star.addEventListener('mouseenter', () => {
//         star.parentNode.querySelector('.song__favorite--popup').classList.add('song__favorite--popup-hover');
//     });
//     star.addEventListener('mouseleave', () => {
//         star.parentNode.querySelector('.song__favorite--popup').classList.remove('song__favorite--popup-hover');
//     });
//     star.addEventListener('click', () => {
//         star.classList.toggle('song__favorite--selected');
//         // persist data in localstorage or backend db
//         // let trackNumber = star.parentNode.querySelector('.album__track--number span');
//         // trackNumber = parseInt(trackNumber.textContent);
//         // const matchingSong = allSongLists[state.currentAlbumIndex].find(song => {
//         //     return song.song_order === trackNumber;
//         // });
//     });
//     // star.addEventListener('mouseenter', () => {
        
//     // });


    
// });
/*
<section class="albums__visual">
        <% for (let i = 0; i < allAlbums.length; i++) { %>
        <div class="albums__individual albums__individual-<%= i + 1 %>" 
            data-songs="<%= allSongLists[i] %>" data-albumID="<%= allAlbums[i].id %>">
            <img src="<%= allAlbums[i].cover_photo_url%>" alt="<%= allAlbums[i].name %>">
            <p class="album__name"><%= allAlbums[i].name.toUpperCase() %></p>
            <p class="artist__name"><%= allAlbums[i].artist_name.toUpperCase() %></p>
        </div>
        <% } %>
    </section>
    
    <section class="lower-body__container">
        <div class="album__selected--songlist">
            <ul>
                <% const mainAlbumIndex = 2; %>
                <% const mainSongList = JSON.parse(allSongLists[mainAlbumIndex]); %>
                <% for (nextSong of mainSongList) { %>
                <li class="songlist__individual" data-songID="<%= nextSong.id %>>">
                    <div>
                        <div class="album__track--number">
                            <span><%= nextSong.song_order %></span>
                        </div>
                        <img class="song__favorite--select" src="/img/favorite-star.svg" alt="Favorites">
                        <p class="song__favorite--popup">MARK AS FAVORITE</p>
                        <p class="album__song--name"><%= nextSong.song_name.toUpperCase() %></p>
                        <% if (nextSong['song_label'] != null) { %>
                        <% if (nextSong.song_label.length > 0) { %>
                        <div class="album__song--categories">
                            <% if (nextSong.song_label.includes('explicit')) { %>
                            <span>EXPLICIT</span>
                            <% } %>
                            <% if (nextSong.song_label.includes('upbeat')) { %>
                            <span>UPBEAT</span>
                            <% } %>
                        </div>
                        <% } %>
                        <% } %>
                    </div>
                    <p class="album__song--time"><%= nextSong.song_duration %></p>
                </li>
                <% } %>
            </ul>
        </div>
    </section>
*/


