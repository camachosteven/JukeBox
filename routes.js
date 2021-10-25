const router = require('express').Router();
const axios = require('axios');

/**
 * This route calls the Albums API and Songs API.
 * If the Album API call returns successfully, then it calls the Songs API 
 * for each album concurrently. Using Promise.all it returns all responses from the calls
 * in the order they were sent. Once all responses are received, they are stringified and
 * stored in the APIData object to be passed as context to the template. 
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
        APIData.allAlbums = allAlbumsResponse.data;
        return Promise.all(APIData.allAlbums.map(element => getSongs(element.id)));
    })
    .then(allSongListResponses => {
        const allSongLists = [];
        for (songListResponse of allSongListResponses) {
            allSongLists.push(JSON.stringify(songListResponse.data));
        }
        APIData.allSongLists = allSongLists;
        res.render('index', APIData);
    })
    .catch(error => {
        console.log(error);
        res.render('index', returnSampleData());
    });
});

/**
 * This method is used by the array.map function.
 * It takes in an id, returns a promise of the API call containing that
 * album id's song list. 
 */
const getSongs = albumID => {
    return axios({
        url: `https://stg-resque.hakuapp.com/songs.json?album_id=${albumID}`,
        method: 'get'
    });
};

/** 
 * This method return sample data for the route to pass to the template in case
 * any of the API calls return unsuccessfully. 
*/
const returnSampleData = () => {
    return {
        allAlbums: [
            {
                id: 1,
                name: "IT IS TOO LATE",
                artist__name: 'Drake',
                cover_photo_url: '/img/sample-album.png'
            },
            {
                id: 2,
                name: "IT IS TOO LATE",
                artist__name: 'Drake',
                cover_photo_url: '/img/sample-album.png'
            },
            {
                id: 3,
                name: "IT IS TOO LATE",
                artist__name: 'Drake',
                cover_photo_url: '/img/sample-album.png'
            },{
                id: 4,
                name: "IT IS TOO LATE",
                artist__name: 'Drake',
                cover_photo_url: '/img/sample-album.png'
            },
            {
                id: 5,
                name: "IT IS TOO LATE",
                artist__name: 'Drake',
                cover_photo_url: '/img/sample-album.png'
            }
        ],
        allSongLists: [
            [
                {
                id: 1,
                album_id: 1,
                song_name: "God's Plan",
                song_order: 1,
                song_label: [
                    'explicit',
                    'upbeat'
                    ]
                },
                {
                    id: 2,
                    album_id: 1,
                    song_name: "God's Plan",
                    song_order: 2,
                    song_label: [
                        'explicit'
                    ]
                }
            ],
            [
                {
                id: 1,
                album_id: 2,
                song_name: "God's Plan",
                song_order: 1,
                song_label: [
                    'explicit',
                    'upbeat'
                    ]
                },
                {
                    id: 2,
                    album_id: 2,
                    song_name: "God's Plan",
                    song_order: 2,
                    song_label: [
                        'upbeat'
                    ]
                }
            ],
            [
                {
                id: 1,
                album_id: 3,
                song_name: "God's Plan",
                song_order: 1,
                song_label: [
                    'explicit',
                    'upbeat'
                    ]
                },
                {
                    id: 2,
                    album_id: 3,
                    song_name: "God's Plan",
                    song_order: 2,
                    song_label: [
                        'explicit',
                        'upbeat'
                    ]
                }
            ],
            [
                {
                id: 1,
                album_id: 4,
                song_name: "God's Plan",
                song_order: 1,
                song_label: [
                    'explicit',
                    'upbeat'
                    ]
                },
                {
                    id: 2,
                    album_id: 4,
                    song_name: "God's Plan",
                    song_order: 2,
                    song_label: []
                }
            ],
            [
                {
                id: 1,
                album_id: 5,
                song_name: "God's Plan",
                song_order: 1,
                song_label: [
                    'explicit',
                    'upbeat'
                    ]
                },
                {
                    id: 2,
                    album_id: 5,
                    song_name: "God's Plan",
                    song_order: 2,
                    song_label: [
                        'explicit',
                        'upbeat'
                    ]
                }
            ]

        ]
    }
};


module.exports = router;