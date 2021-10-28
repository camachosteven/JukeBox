/* The following is in regarding to the carousel */
const previousArrow = document.querySelector('.previous__arrow');
const nextArrow = document.querySelector('.next__arrow');

const classes = [
    "albums__individual-main",
    "albums__individual-right-of-main",
    "albums__individual-right-end",
    "albums__individual-left-end",
    "albums__individual-left-of-main"
];

/**
 * This is event listener perform multiple tasks. 
 * 1. find index of the active glide slide
 * 2. When the active glide slide changes, change the classes that show this
 * e.g. albums__individual-main.
 * 3. Also change the song list to match the active album. 
 */
previousArrow.addEventListener('click', () => changeAlbumSongList('previous'));

/**
 * This is event listener perform multiple tasks. 
 * 1. find index of the active glide slide
 * 2. When the active glide slide changes, change the classes that show this
 * e.g. albums__individual-main.
 * 3. Also change the song list to match the active album. 
 */
nextArrow.addEventListener('click', () => changeAlbumSongList('next'));

const changeAlbumSongList = (transitionType) => {
    const allAlbumClones = Array.from(document.querySelectorAll('.albums__individual'));
    const glideActiveIndex = allAlbumClones.findIndex(album => {
        const classesAsArray = Array.from(album.classList);
        return classesAsArray.find(className => className === 'glide__slide--active');
    });

    /**
     * For some reason, Glidejs will not change the slide once in a while whenever you click
     * the next arrow. To ensure custom functionality, change classes only when active
     * slide changes from current slide. 
     */ 
    if (state.glideActiveIndex !== glideActiveIndex) {
        
        state.glideActiveIndex = glideActiveIndex;
        
        /**
         * For each album clone element:
         * 1. Get classlist
         * 2. find what design class (listed in classes[]) the element contains
         * 3. determine its next class
         * 4. replace classes
         */
        for (let i = 0; i < allAlbumClones.length; i++) {
            const classesAsArray = Array.from(allAlbumClones[i].classList);
            const oldClass = classesAsArray.find(className => {
                const endRegex = new RegExp(/end$/);
                const mainRegex = new RegExp(/main$/);
                return endRegex.test(className) || mainRegex.test(className)
            });
            let newClass;
            if (transitionType === 'previous') {
                newClass = classes.find((className, index) => {
                    if (index === 0) {
                        return classes[classes.length - 1] === oldClass
                    } else {
                        return classes[index - 1] === oldClass
                    }
                });
            } else if (transitionType === 'next') {
                newClass = classes.find((className, index) => {
                    if (index === classes.length - 1) {
                        return classes[0] === oldClass
                    } else {
                        return classes[index + 1] === oldClass
                    }
                });
            }

            allAlbumClones[i].classList.remove(oldClass);
            allAlbumClones[i].classList.add(newClass);
        }

        /**
         * This next block of code expands and collapses the song lists. 
         * Find the visible position
         * Make it hidden
         * Move to the next songlist
         */
        let songListsContainers = Array.from(document.querySelectorAll('.lower-body__container > .collapse__content'));
        const activePosition = 0;
        const visibleElement = songListsContainers[activePosition];
        visibleElement.classList.remove('collapse__content--active', 'album__selected--songlist');

        let currentElement;
        if (transitionType === 'previous') {
            [currentElement] = songListsContainers.splice(-1, 1);
            currentElement.classList.add('collapse__content--active');
        } else if (transitionType === 'next') {
            [currentElement] = songListsContainers.splice(0, 1);
            songListsContainers[activePosition].classList.add('collapse__content--active');
        }
        
        
        const parent = currentElement.parentNode;
        parent.removeChild(currentElement);
        if (transitionType == 'previous') {
            parent.insertAdjacentHTML('afterbegin', currentElement.outerHTML);
        } else if (transitionType === 'next') {
            parent.insertAdjacentHTML('beforeend', currentElement.outerHTML);
        }

        songListsContainers = Array.from(document.querySelectorAll('.lower-body__container > .collapse__content'));
        songListsContainers[activePosition].style.maxHeight = songListsContainers[activePosition].scrollHeight + 'px';  
        
        /** 
         * even after the active slide class was removed, style of maxHeight must removed 
         * or else it wont be hidden
         */
        if (transitionType == 'previous') {
            songListsContainers[activePosition + 1].removeAttribute('style');
        } else if (transitionType === 'next') {
            songListsContainers[songListsContainers.length - 1].removeAttribute('style');
        }

        // add eventlisteners to the new songlist to handle hover effects
        addSongHoverEffects();
    }
};

/** These eventlisteners are for the graphics of the arrows */
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