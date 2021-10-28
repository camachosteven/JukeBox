
/**
 * The following eventlisteners handle the hover effect on the individual song blocks. 
 */

addSongHoverEffects();

function addSongHoverEffects() {
    const songlist = document.querySelector('.collapse__content ul');

    songlist.addEventListener('mouseover', event => {
        const element = event.target;
        if (element.closest('.songlist__individual')) {
    
            /**
             * if the element.closest is the favorite star image, display the popup
             * to mark as favorite
             */
            if (element.closest('.song__favorite--select')) {
                element.parentNode.querySelector('.song__favorite--popup').classList.add('song__favorite--popup-hover');
            }

            const song = element.closest('.songlist__individual');

            /** add classes for the individual song element as well as the respective classes for it children */
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

        /**
        * if the element.closest is the favorite star image, remove the popup
        */
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
        }
    });
};
