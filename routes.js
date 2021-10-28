const router = require('express').Router();
const axios = require('axios');

/**
 * This route calls the Albums API and Songs API.
 * If the Album API call returns successfully, then it calls the Songs API 
 * for each album concurrently. Once all responses are received, they are stored in the 
 * APIData object to be passed as context to the template. 
 * If the Album API call or any of the Songs API calls return unsuccessfully, the app will
 * simply return sample data. 
 */
router.get('/', (req, res) => {
    const APIData = {};
    axios({
        method: 'get',
        url: 'https://stg-resque.hakuapp.com/albums.json'
    })
    .then(allAlbumsResponse => {
        
        // shuffle albums for a different order every time
        APIData.allAlbums = shuffleAlbums(allAlbumsResponse.data);
        return Promise.all(APIData.allAlbums.map(element => getSongs(element.id)));
 
    })
    .then(allSongListResponses => {
        const allSongLists = [];

        /**
         * For every songlist, you must sort the songs by song order.
         * Store them as a JSON string.
         */
        for (songListResponse of allSongListResponses) {
            const sortedSonglist = songListResponse.data.sort((song1, song2) => {
                return song1.song_order - song2.song_order;
            });
            allSongLists.push(JSON.stringify(sortedSonglist));
        }
        APIData.allSongLists = allSongLists;
        res.render('index', APIData);

    })
    .catch(error => {
        
        /**
         * return sample data for app to continue functionality
         * in case API calls failed for whatever reason
         */

        res.render('index', returnSampleData());

    });
});

/**
 * This method shuffles the albums in random order.
 * @param {Object[]} albums 
 * @returns {Object[]} albums in random order
 */
const shuffleAlbums = albums => {
    for (let i = 0; i < albums.length; i++) {
        let randomNumber = Math.floor(Math.random() * albums.length);
        const temp = albums[i];
        albums[i] = albums[randomNumber];
        albums[randomNumber] = temp;
    }
    return albums
};


/**
 * This method is used by the array.map function to make concurrent calls to Song API
 * @param {Number} albumID id of album desired
 * @returns {Promise} a Promise containing the response of that API call using axios
 */
const getSongs = albumID => {
    return axios({
        url: `https://stg-resque.hakuapp.com/songs.json?album_id=${albumID}`,
        method: 'get'
    });
};

/** 
 * This method simply constructs sample data for the app to use in case 
 * of an API call failure.  
*/
const returnSampleData = () => {
    return {
        allAlbums: [
            {
                id: 1,
                name: "IT IS TOO LATE",
                artist_name: 'Drake',
                cover_photo_url: '/img/sample-album.png'
            },
            {
                id: 2,
                name: "IT IS TOO LATE",
                artist_name: 'Drake',
                cover_photo_url: '/img/sample-album.png'
            },
            {
                id: 3,
                name: "IT IS TOO LATE",
                artist_name: 'Drake',
                cover_photo_url: '/img/sample-album.png'
            },{
                id: 4,
                name: "IT IS TOO LATE",
                artist_name: 'Drake',
                cover_photo_url: '/img/sample-album.png'
            },
            {
                id: 5,
                name: "IT IS TOO LATE",
                artist_name: 'Drake',
                cover_photo_url: '/img/sample-album.png'
            }
        ],
        allSongLists: [
            JSON.stringify([
                {
                id: 1,
                album_id: 1,
                song_name: "God's Plan",
                song_order: 1,
                song_label: [
                    'explicit',
                    'upbeat'
                    ],
                song_duration: '3:46'
                },
                {
                    id: 2,
                    album_id: 1,
                    song_name: "God's Plan",
                    song_order: 2,
                    song_label: [
                        'explicit'
                    ],
                    song_duration: '3:46'
                }
            ]),
            JSON.stringify([
                {
                id: 1,
                album_id: 2,
                song_name: "God's Plan",
                song_order: 1,
                song_label: [
                    'explicit',
                    'upbeat'
                    ],
                song_duration: '3:46'
                },
                {
                    id: 2,
                    album_id: 2,
                    song_name: "God's Plan",
                    song_order: 2,
                    song_label: [
                        'upbeat'
                    ],
                    song_duration: '3:46'
                }
            ]),
            JSON.stringify([
                {
                id: 1,
                album_id: 3,
                song_name: "God's Plan",
                song_order: 1,
                song_label: [
                    'explicit',
                    'upbeat'
                    ],
                song_duration: '3:46'
                },
                {
                    id: 2,
                    album_id: 3,
                    song_name: "God's Plan",
                    song_order: 2,
                    song_label: [
                        'explicit',
                        'upbeat'
                    ],
                    song_duration: '3:46'
                }
            ]),
            JSON.stringify([
                {
                id: 1,
                album_id: 4,
                song_name: "God's Plan",
                song_order: 1,
                song_label: [
                    'explicit',
                    'upbeat'
                    ],
                song_duration: '3:46'
                },
                {
                    id: 2,
                    album_id: 4,
                    song_name: "God's Plan",
                    song_order: 2,
                    song_label: [],
                    song_duration: '3:46'
                }
            ]),
            JSON.stringify([
                {
                id: 1,
                album_id: 5,
                song_name: "God's Plan",
                song_order: 1,
                song_label: [
                    'explicit',
                    'upbeat'
                    ],
                song_duration: '3:46'
                },
                {
                    id: 2,
                    album_id: 5,
                    song_name: "God's Plan",
                    song_order: 2,
                    song_label: [
                        'explicit',
                        'upbeat'
                    ],
                    song_duration: '3:46'
                }
            ])
        ]
    }
};


module.exports = router;