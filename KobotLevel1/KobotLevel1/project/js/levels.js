function copy(aObject) {
    // Prevent undefined objects
    // if (!aObject) return aObject;

    let bObject = Array.isArray(aObject) ? [] : {};

    let value;
    for (const key in aObject) {

        // Prevent self-references to parent object
        // if (Object.is(aObject[key], aObject)) continue;

        value = aObject[key];

        bObject[key] = (typeof value === "object") ? copy(value) : value;
    }

    return bObject;
}



/* --- Levels data --- */

// const levels = [
//     // level 1
//     {
//         id: 1,
//         maxBlocks: 10,
//         // the blocks to show in the toolbox
//         blocks:[
//             'move',
//             'turn',
//             'energie'
//         ],
//         chargers:[
//             {
//                 count:2,
//                 x:1,
//                 y:1,
//             }
//         ],
//         // game data
//         game: {
//             // pegman data
//             pegman: {
//                 direction: 1,
//                 x: 0,
//                 y: 0
//             },
//             // marker data
//             marker: {
//                 x: 2,
//                 y: 1
//             },
//             // game path
//             path: [
//                 // [x, y]
//                 [0, 0],
//                 [1, 0],
//                 [1, 1],
//                 [2, 1]
//             ]
//         }
//     },
//     //level 2
//     {
//         id: 2,

//         // maximum blocks allowed
//         maxBlocks: 100,

//         enemies:[
//             {
//                 x: 5,
//                 y: 2,
//             }
//         ],

//         //game data
//         game: {
//             // pegman data
//             pegman: {
//                 direction: 1,
//                 x: 0,
//                 y: 0
//             },
//             // marker data
//             marker: {
//                 x: 3,
//                 y: 5
//             },
//             // game path
//             path: [
//                 // [x, y]
//                 [0, 0],
//                 [1, 0],
//                 [2, 0],

//                 // Red Path
//                 [3, 0],

//                 [2, 1],
//                 [2, 2],

//                 // Red Path
//                 [2, 3],
//                 [1, 2],
//                 [0, 2],                

//                 [3, 2],
//                 [4, 2],

//                 // Red Path Not added
//                 [5, 2],

//                 [4, 3],
//                 [4, 4],

//                 // Red Path 
//                 [4, 5],

//                 [3, 4],
//                 [3, 5],
//                 // [4, 4],
//                 // [5, 4],
//                 // [5, 5],
//             ]
//         }
//     },
//         //level 3
//     {
//         id: 3,

//         // maximum blocks allowed
//         maxBlocks: 7,
//         //game data
//         game: {
//             // pegman data
//             pegman: {
//                 direction: 1,
//                 x: 0,
//                 y: 0
//             },
//             // marker data
//             marker: {
//                 x: 4,
//                 y: 4
//             },
//             chargers:[
//                 {
//                     count:2,
//                     x:0,
//                     y:2,
//                 }
//             ],
//             // game path
//             path: [
//                 // [x, y]
//                 [0, 0],
//                 [1, 0],
//                 [2, 0],
//                 [2, 1],
//                 [2, 2],
//                 [3, 2],
//                 [4, 2],
//                 [4, 3],
//                 [4, 4],

//             ]
//         }
//     },
//         // level 4
//     {

//         id: 4,

//         // maximum blocks allowed
//         maxBlocks: 7,
//         //game data
//         game: {
//             // pegman data
//             pegman: {
//                 direction: 1,
//                 x: 0,
//                 y: 0
//             },
//             // marker data
//             marker: {
//                 x: 4,
//                 y: 4
//             },
//             // game path
//             path: [
//                 // [x, y]
//                 [0, 0],
//                 [1, 0],
//                 [2, 0],
//                 [2, 1],
//                 [2, 2],
//                 [3, 2],
//                 [4, 2],
//                 [4, 3],
//                 [4, 4],

//             ]
//         }
//     },
//     {

//         id: 5,

//         // maximum blocks allowed
//         maxBlocks: 7,
//         //game data
//         game: {
//             // pegman data
//             pegman: {
//                 direction: 1,
//                 x: 0,
//                 y: 0
//             },
//             // marker data
//             marker: {
//                 x: 4,
//                 y: 4
//             },
//             // game path
//             path: [
//                 // [x, y]
//                 [0, 0],
//                 [1, 0],
//                 [2, 0],
//                 [2, 1],
//                 [2, 2],
//                 [3, 2],
//                 [4, 2],
//                 [4, 3],
//                 [4, 4],

//             ]
//         }
//     },

// ]


const levels = [
    // level 1
    {
        id: 1,
        maxBlocks: 10,
        // the blocks to show in the toolbox
        blocks: [
            'move',
            'turn',
        ],
        enemies: [
            {
                x: 3,
                y: 0,
            }
        ],
        // game data
        game: {
            // pegman data
            pegman: {
                direction: 1,
                x: 0,
                y: 0
            },
            // marker data
            marker: {
                x: 2,
                y: -1
            },
            // game path
            path: [
                // [x, y]
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
                [2, -1]
            ]
        }
    },
    //level 2
    {
        id: 2,

        // maximum blocks allowed
        maxBlocks: 100,

        blocks: [
            'move',
            'turn',
        ],

        enemies: [
            {
                x: -1,
                y: 0,
            },
            {
                x: 1,
                y: 3,
            },
        ],

        //game data
        game: {
            // pegman data
            pegman: {
                direction: 1,
                x: 0,
                y: 0
            },
            // marker data
            marker: {
                x: 3,
                y: 5
            },
            // game path
            path: [
                // [x, y]
                [-1, 0],
                [0, 0],
                [1, 0],
                [1, 1],
                [2, 1],
                [3, 1],

                // [2, 3],
                // [1, 2],
                // [0, 2],                

                // [3, 2],
                // [4, 2],

                // // Red Path Not added
                // [5, 2],

                // [4, 3],
                // [4, 4],

                // // Red Path 
                // [4, 5],

                // [3, 4],
                // [3, 5],
                // [4, 4],
                // [5, 4],
                // [5, 5],
            ]
        }
    },
    //level 3
    {
        id: 3,

        // maximum blocks allowed
        maxBlocks: 7,

        blocks: [
            'move',
            'turn',
        ],

        enemies: [
            {
                x: -1,
                y: -3,
            }

        ],
        //game data
        game: {
            // pegman data
            pegman: {
                direction: 1,
                x: 0,
                y: 0
            },
            // marker data
            marker: {
                x: 4,
                y: 4
            },
            // game path
            path: [
                // [x, y]
                [0, 0],
                [0, -1],
                [0, -2],
                [-1, -2],
                [-1, -3],
                [-2, -2],
                [-3, -2],
                [-3, -3],
                [-3, -4],

            ]
        }
    },
    // level 4
    {

        id: 4,

        // maximum blocks allowed
        maxBlocks: 7,

        blocks: [
            'move',
            'turn',
        ],

        //game data
        enemies: [
            {
                x: 2,
                y: 2,
            },
            {
                x: 1,
                y: -2,
            },
            {
                x: 4,
                y: 0,
            },

        ],
        game: {
            // pegman data
            pegman: {
                direction: 1,
                x: 0,
                y: 0
            },
            // marker data
            marker: {
                x: 3,
                y: 0
            },
            // game path
            path: [
                // [x, y]
                [0, 0],
                [0, 1],
                [0, -1],
                [1, -1],
                [1, 1],
                [2, -1],
                [2, 1],
                [3, -1],
                [3, 1],
                [3, 0],
                [4, 0],
                [2, 2],
                [1, -2],
            ]
        }
    },
    // level 5
    {

        id: 5,

        // maximum blocks allowed
        maxBlocks: 8,

        blocks: [
            'move',
            'turn',
        ],

        //game data
        enemies: [
            {
                x: 2,
                y: 2,
            },
            {
                x: 1,
                y: -2,
            },
            {
                x: 4,
                y: 0,
            },

        ],
        game: {
            // pegman data
            pegman: {
                direction: 1,
                x: 0,
                y: 0
            },
            // marker data
            marker: {
                x: 3,
                y: 0
            },
            // game path
            path: [
                // [x, y]
                [0, 0],
                [0, 1],
                [0, -1],
                [1, -1],
                [1, 1],
                [2, -1],
                [2, 1],
                [3, -1],
                [3, 1],
                [3, 0],
                [4, 0],
                [2, 2],
                [1, -2],
            ]
        }
    },
]