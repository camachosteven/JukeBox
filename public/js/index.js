const allSongLists = [];
const state = {};

/** Obtain songs from each album, delete dataset from each tag */
window.addEventListener('DOMContentLoaded', event => {
    state.currentAlbumIndex = 0;
    state.initialGlideIndex = 5;
    state.finalGlideIndex = 9;
    const albums = Array.from(document.querySelectorAll('.albums__individual'))
    .slice(state.initialGlideIndex, state.finalGlideIndex + 1);
    for (album of albums) {
        const songs = JSON.parse(album.dataset.songs);
        allSongLists.push(songs);
        delete album.dataset.songs;
    }
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
        const glideAlbumID = allAlbumClones[state.glideActiveIndex].dataset.albumid;
        const noDuplicateAlbums = allAlbumClones.slice(0, allAlbumClones.length / 3);
        let albumPosition = noDuplicateAlbums.findIndex(element => {
            return parseInt(element.dataset.albumid) == glideAlbumID
        });
        let allSongs = '';
        if (albumPosition === 0) {
            albumPosition = noDuplicateAlbums.length - 1;
        } else {
            albumPosition -= 1;
        } 
        allSongLists[albumPosition].forEach(element => {
            let categories = '<div class="album__song--categories">';
            if (element.song_label) {
                if (element.song_label.includes('explicit')) {
                    categories += '<span>EXPLICIT</span>';
                } else if (element.song_label.includes('upbeat')) {
                    categories += '<span>UPBEAT</span>';
                }
            }
            categories += '</div>';
            allSongs += `
                <li class="songlist__individual" data-songID="${element.id}">
                    <div>
                        <div class="album__track--number">
                            <span>${element.song_order}</span>
                        </div>
                        <img class="song__favorite--select" src="/img/favorite-star.svg" alt="Favorites">
                        <p class="song__favorite--popup">MARK AS FAVORITE</p>
                        <p class="album__song--name">${element.song_name.toUpperCase()}</p>
                        ${categories}
                    </div>
                    <p class="album__song--time">${element.song_duration}</p>
                </li>
            `;
        });
        document.querySelector('.album__selected--songlist ul').innerHTML = allSongs;
    }
});

previousArrow.addEventListener('mouseenter', () => {
    document.querySelector('.previous__arrow').classList.add('previous__arrow--hover');
});

previousArrow.addEventListener('mouseleave', () => {
    document.querySelector('.previous__arrow').classList.remove('previous__arrow--hover');
});

previousArrow.addEventListener('mousedown', () => {
    document.querySelector('.previous__arrow').classList.add('previous__arrow--down');
});

previousArrow.addEventListener('mouseup', () => {
    document.querySelector('.previous__arrow').classList.remove('previous__arrow--down');
});

nextArrow.addEventListener('mouseenter', () => {
    document.querySelector('.next__arrow').classList.add('next__arrow--hover');
});

nextArrow.addEventListener('mouseleave', () => {
    document.querySelector('.next__arrow').classList.remove('next__arrow--hover');
});

nextArrow.addEventListener('mousedown', () => {
    document.querySelector('.next__arrow').classList.add('next__arrow--down');
});

nextArrow.addEventListener('mouseup', () => {
    document.querySelector('.next__arrow').classList.remove('next__arrow--down');
});

nextArrow.addEventListener('click', () => {
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
        }
        const glideAlbumID = allAlbumClones[state.glideActiveIndex].dataset.albumid;
        const noDuplicateAlbums = allAlbumClones.slice(0, allAlbumClones.length / 3);
        let albumPosition = noDuplicateAlbums.findIndex(element => {
            return parseInt(element.dataset.albumid) == glideAlbumID
        });
        let allSongs = '';
        if (albumPosition === noDuplicateAlbums.length - 1) {
            albumPosition = 0;
        } else {
            albumPosition += 1;
        } 
        allSongLists[albumPosition].forEach(element => {
            let categories = '<div class="album__song--categories">';
            if (element.song_label) {
                if (element.song_label.includes('explicit')) {
                    categories += '<span>EXPLICIT</span>';
                } else if (element.song_label.includes('upbeat')) {
                    categories += '<span>UPBEAT</span>';
                }
            }
            categories += '</div>';
            allSongs += `
                <li class="songlist__individual" data-songID="${element.id}">
                    <div>
                        <div class="album__track--number">
                            <span>${element.song_order}</span>
                        </div>
                        <img class="song__favorite--select" src="/img/favorite-star.svg" alt="Favorites">
                        <p class="song__favorite--popup">MARK AS FAVORITE</p>
                        <p class="album__song--name">${element.song_name.toUpperCase()}</p>
                        ${categories}
                    </div>
                    <p class="album__song--time">${element.song_duration}</p>
                </li>
            `;
        });
        document.querySelector('.album__selected--songlist ul').innerHTML = allSongs;
    }
});



// hover effects



const songlist = document.querySelector('.album__selected--songlist ul');
songlist.addEventListener('mouseover', event => {
    const element = event.target;
    if (element.closest('.songlist__individual')) {
        if (element.closest('.song__favorite--select')) {
            element.parentNode.querySelector('.song__favorite--popup').classList.add('song__favorite--popup-hover');
        }
        const song = element.closest('.songlist__individual');
        song.classList.add('songlist__individual--hover');
        song.querySelector('.album__song--name').classList.add('album__song--name-hover');
        song.querySelector('.song__favorite--select').classList.add('song__favorite--select-hover');
        const categories = Array.from(song.querySelectorAll('.album__song--categories span'));
        categories.forEach(element => element.classList.add('album__song--categories-hover'));
        song.querySelector('.album__song--time').classList.add('album__song--time-hover');
    }
});

songlist.addEventListener('mouseout', event => {
    const element = event.target;
    if (element.closest('.songlist__individual')) {
        if (element.closest('.song__favorite--select')) {
            element.parentNode.querySelector('.song__favorite--popup').classList.remove('song__favorite--popup-hover');
        }
        const song = element.closest('.songlist__individual');
        song.classList.remove('songlist__individual--hover');
        song.querySelector('.album__song--name').classList.remove('album__song--name-hover');
        song.querySelector('.song__favorite--select').classList.remove('song__favorite--select-hover');
        const categories = Array.from(song.querySelectorAll('.album__song--categories span'));
        categories.forEach(element => element.classList.remove('album__song--categories-hover'));
        song.querySelector('.album__song--time').classList.remove('album__song--time-hover');
    }    
});

songlist.addEventListener('click', event => {
    const star = event.target;
    if (star.closest('.song__favorite--select')) {
        star.classList.toggle('song__favorite--selected');
        // persist data in localstorage or backend db
        // let trackNumber = star.parentNode.querySelector('.album__track--number span');
        // trackNumber = parseInt(trackNumber.textContent);
        // const matchingSong = allSongLists[state.currentAlbumIndex].find(song => {
        //     return song.song_order === trackNumber;
        // }); 
    }
});

const favoriteStars = Array.from(document.querySelectorAll('.song__favorite--select'));


    
    



