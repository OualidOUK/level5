// const levelo = document.getElementById("lvl_1");
// const levelt = document.getElementById("lvl_2");
// const levelth = document.getElementById("lvl_3");
// const levelfr = document.getElementById("lvl_4");

// game
// const gmelvl3 = document.querySelector(".gmelvl3");
// const gmelvl2 = document.querySelector(".gmelvl2");
// const gmelvl1 = document.querySelector(".gmelvl1");
// const gmelvl4 = document.querySelector(".gmelvl4");
const gmelvl5 = document.querySelector(".gmelvl5");



// levelo.addEventListener("click", () => {
  // gmelvl1.style.display = "none";
  // gmelvl2.style.display = "none";
  // gmelvl3.style.display = "block";
  // document.getElementById("jouerbtn").style.display = "block";
  // document.getElementById("rejouerbtn").style.display = "none";
  // console.log(levels[0])
  // game.loadLevel(levels[0])
  // Swal.fire({
  //   title: "Instruction for level ONE",
  //   icon: "info",
  //   html: "<p class=popuppara>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>",
  //   showCloseButton: true,
  //   showCancelButton: true,
  //   focusConfirm: false,
  //   confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
  // });
// });
// levelt.addEventListener("click", () => {
//   // gmelvl1.style.display = "none";
//   // gmelvl2.style.display = "block";
//   // gmelvl3.style.display = "none";
//   // document.getElementById("jouerbtn").style.display = "block";
//   // document.getElementById("rejouerbtn").style.display = "none";
//   game.loadLevel(levels[id = 1])
//   // Swal.fire({
//   //   title: "Instruction for level TWO",
//   //   icon: "info",
//   //   html: "<p class=popuppara>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>",
//   //   showCloseButton: true,
//   //   showCancelButton: true,
//   //   focusConfirm: false,
//   //   confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
//   // });
// // });
// levelth.addEventListener("click", () => {
//   // gmelvl1.style.display = "block";
//   // gmelvl2.style.display = "none";
//   // gmelvl3.style.display = "none";
//   // document.getElementById("jouerbtn").style.display = "block";
//   // document.getElementById("rejouerbtn").style.display = "none";
//   game.loadLevel(levels[id = 2])
//   // Swal.fire({
//   //   title: "Instruction for level THREE",
//   //   icon: "info",
//   //   html: "<p class=popuppara>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>",
//   //   showCloseButton: true,
//   //   showCancelButton: true,
//   //   focusConfirm: false,
//   //   confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
//   // });
// });

// levelfr.addEventListener("click", () => {
//   // gmelvl1.style.display = "block";
//   // gmelvl2.style.display = "none";
//   // gmelvl3.style.display = "none";
//   // document.getElementById("jouerbtn").style.display = "block";
//   // document.getElementById("rejouerbtn").style.display = "none";
//   game.loadLevel(levels[3])
//   // Swal.fire({
//   //   title: "Instruction for level THREE",
//   //   icon: "info",
//   //   html: "<p class=popuppara>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>",
//   //   showCloseButton: true,
//   //   showCancelButton: true,
//   //   focusConfirm: false,
//   //   confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
//   // });
// });
function copyToClipBoard() {

  var content = document.getElementById('CodeLevel').innerHTML;

  navigator.clipboard.writeText(content)

}


document.getElementById("jouerbtn").addEventListener("click", () => {
  // document.getElementById("rejouerbtn").style.display = "block";
  // document.getElementById("jouerbtn").style.display = "none";
  game.loadCode();
  gamepad.play();
  game.btnPlayPressed = true

});
// document.getElementById("rejouerbtn").addEventListener("click", () => {
//   // document.getElementById("rejouerbtn").style.display = "none";
//   // document.getElementById("jouerbtn").style.display = "block";
//   game.loadCode();
//   gamepad.play();
// });

const starover = document.querySelector("#rejouerbtn");
const showcode = document.querySelector("#algorithm");
const forward = document.querySelector("#forward");
const backward = document.querySelector("#backward");
starover.addEventListener("click", () => {
  Swal.fire({
    title: "Are you sure you want to start over?",
    text: "This will reset the puzzle to its start state and delete all the blocks you've added or changed.",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "cancel",
    denyButtonText: `Star Over`,
  }).then((result) => {  
    /* Read more about isConfirmed, isDenied below */  
    if (!result.isConfirmed) {
      game.gamepad.reset();
      game.loadCode();
    }
    
  });
});
showcode.addEventListener("click", () => {
  var str = game.correctionCode === undefined ? "the Code is not loaded yet" : game.correctionCode
  Swal.fire({
    html: "<p class=popuppara>Even top universities teach block-based coding (e.g., Berkeley, Harvard). But under the hood, the blocks you have assembled can also be shown in JavaScript, the world's most widely used coding language</p><div>" + str + "</div>"
  });
});
forward.addEventListener("click", () => {
  // var instruction = game.correctionCode === undefined ? true : false
  // if(instruction){Swal.fire({
  //   html: "<div>the Code is not loaded yet, please play the code first and try again</div>"
  // });}else
  // {
    game.btnAvancer = true
    if (game.countPress<1){ game.loadCode()};
    game.countPress++;
    gamepad.forward() + gui.removeAnimation()
  // }
}
);
// backward.addEventListener("click", () => {
//   // var instruction = game.correctionCode === undefined ? true : false
//   // if(instruction){Swal.fire({
//   //   html: "<div>the Code is not loaded yet, please play the code first and try again</div>"
//   // });}else
//   // {
//     game.btnReculer = true
//     if (game.countPress<1){ game.loadCode()};
//     game.countPress++;
//     gamepad.backward() + gui.removeAnimation()
//   // }
  
// });

let toolbox = document.getElementById('toolbox');
let toolbox_noCategories = document.getElementById('toolbox_noCategories');

Blockly.Gamepad['INPUTS'] = {
  'FORWARD': '0',
  'RIGHT': '1',
  'BACKWARD': '2',
  'LEFT': '3'
}

// var startBlock = Blockly.Gamepad['BLOCKS']['START']

// console.log(startBlock)
    
// init the Gamepad
Blockly.Gamepad.init({
  toolbox,
  blocks: {
      'repeat_until': {
          // the request will be { method: 'REPEAT', args: [] }
          method: 'REPEAT', // the method of the request
          statements: ['DO'], // the statement name*
          template: Blockly.Gamepad['TEMPLATES']['WHILE'], // the template type
          json: {
              // type: 'repeat_until',    is automatically setted
              'message0': 'Répéter jusqu a %1 %2 Executer %3',
              'args0': [{
                  'type': 'field_image',
                  'src': 'img/marker.png',
                  'width': 15,
                  'height': 15,
              },
              {
                  'type': 'input_dummy'
              },
              {
                  // the child blocks will be contained here
                  'type': 'input_statement',
                  'name': 'DO' // the statement name*
              }
              ],
              'previousStatement': null,
              'colour': 120,
          }
      },
      'if_path': {
          // the request will be { method: 'PATH', args: [ Blockly.Gamepad['INPUTS']['...some direction'] ]}
          method: 'PATH',
          args: [{
              field: 'DIRECTION', // the field name
              get: parseInt // return the number instead of the string
          }],
          statements: ['DO'],
          template: Blockly.Gamepad['TEMPLATES']['IF'],
          json: {
              'message0': 'Si Le chemin %1 %2 Éxécuter %3',
              'args0': [{
                  'type': 'field_dropdown',
                  'name': 'DIRECTION', // the field name
                  'options': [ // args[0] will be one of these options
                      ['En avant', Blockly.Gamepad['INPUTS']['FORWARD']],
                      ['A droite ↻', Blockly.Gamepad['INPUTS']['RIGHT']],
                      ['A gauche ↺', Blockly.Gamepad['INPUTS']['LEFT']]
                  ]
              },
              {
                  'type': 'input_dummy'
              },
              {
                  'type': 'input_statement',
                  'name': 'DO'
              }
              ],
              'previousStatement': null,
              'nextStatement': null,
              'colour': 210
          }
      },
      'if_else_path': {
          // the request will be { method: 'PATH', args: [ Blockly.Gamepad['INPUTS']['...some direction'] ]}
          method: 'PATH',
          args: [{
              field: 'DIRECTION',
              get: parseInt
          }],
          statements: ['DO', 'ELSE'],
          template: Blockly.Gamepad['TEMPLATES']['IF_ELSE'],
          json: {
            'message0': 'Si Le chemin %1 %2 Éxécuter %3 sinon %4',
            'args0': [{
                'type': 'field_dropdown',
                'name': 'DIRECTION',
                'options': [
                    ['En avant', Blockly.Gamepad['INPUTS']['FORWARD']],
                    ['A droite ↻', Blockly.Gamepad['INPUTS']['RIGHT']],
                    ['A gauche ↺', Blockly.Gamepad['INPUTS']['LEFT']]
                ]
            },
              {
                  'type': 'input_dummy'
              },
              {
                  'type': 'input_statement',
                  'name': 'DO'
              },
              {
                  'type': 'input_statement',
                  'name': 'ELSE'
              }
              ],
              'previousStatement': null,
              'nextStatement': null,
              'colour': 210
          }
      },
      'turn': {
          // the request will be { method: 'TURN', args: [ Blockly.Gamepad['INPUTS']['...some direction'] ]}
          method: 'TURN',
          args: [{
              field: 'DIRECTION',
              get: parseInt
          }],
          json:  {
            'message0': 'Tourner %1',
            'args0': [{
                'type': 'field_dropdown',
                'name': 'DIRECTION',
                'options': [
                    ['Droite ↻', Blockly.Gamepad['INPUTS']['RIGHT']],
                    ['Gauche ↺', Blockly.Gamepad['INPUTS']['LEFT']]
                ]
            }],
            'previousStatement': null,
            'nextStatement': null,
            'colour': 180
        }
      },
      'move': {
          // the request will be { method: 'MOVE', args: [] ]}
          method: 'MOVE',
          json: {
              'message0': 'Avancer',
              'previousStatement': null,
              'nextStatement': null,
              'colour': 180
          }
      },
      'energie': {
        method: 'UPDATE',
        json: {
          'message0': 'Charger',
          'previousStatement': null,
          'nextStatement': null,
          'colour': 180
        }
      },
      'start':{
        json:{
          'message0': 'Commencer',
          'nextStatement': null,
          "colour": 26
        }
      } 
  }
})
// Blockly.Gamepad.init({
//   toolbox_noCategories,
//   blocks: {
//       'repeat_until': {
//           // the request will be { method: 'REPEAT', args: [] }
//           method: 'REPEAT', // the method of the request
//           statements: ['DO'], // the statement name*
//           template: Blockly.Gamepad['TEMPLATES']['WHILE'], // the template type
//           json: {
//               // type: 'repeat_until',    is automatically setted
//               'message0': 'Répéter jusqu a %1 %2 Executer %3',
//               'args0': [{
//                   'type': 'field_image',
//                   'src': 'img/marker.png',
//                   'width': 15,
//                   'height': 15,
//               },
//               {
//                   'type': 'input_dummy'
//               },
//               {
//                   // the child blocks will be contained here
//                   'type': 'input_statement',
//                   'name': 'DO' // the statement name*
//               }
//               ],
//               'previousStatement': null,
//               'colour': 180,
//           }
//       },
//       'if_path': {
//           // the request will be { method: 'PATH', args: [ Blockly.Gamepad['INPUTS']['...some direction'] ]}
//           method: 'PATH',
//           args: [{
//               field: 'DIRECTION', // the field name
//               get: parseInt // return the number instead of the string
//           }],
//           statements: ['DO'],
//           template: Blockly.Gamepad['TEMPLATES']['IF'],
//           json: {
//               'message0': 'Si Le chemin %1 %2 Éxécuter %3',
//               'args0': [{
//                   'type': 'field_dropdown',
//                   'name': 'DIRECTION', // the field name
//                   'options': [ // args[0] will be one of these options
//                       ['En avant', Blockly.Gamepad['INPUTS']['FORWARD']],
//                       ['A droite ↻', Blockly.Gamepad['INPUTS']['RIGHT']],
//                       ['A gauche ↺', Blockly.Gamepad['INPUTS']['LEFT']]
//                   ]
//               },
//               {
//                   'type': 'input_dummy'
//               },
//               {
//                   'type': 'input_statement',
//                   'name': 'DO'
//               }
//               ],
//               'previousStatement': null,
//               'nextStatement': null,
//               'colour': 180
//           }
//       },
//       'if_else_path': {
//           // the request will be { method: 'PATH', args: [ Blockly.Gamepad['INPUTS']['...some direction'] ]}
//           method: 'PATH',
//           args: [{
//               field: 'DIRECTION',
//               get: parseInt
//           }],
//           statements: ['DO', 'ELSE'],
//           template: Blockly.Gamepad['TEMPLATES']['IF_ELSE'],
          // json: {
          //     'message0': 'Si Le chemin %1 %2 Éxécuter %3 sinon %4',
          //     'args0': [{
          //         'type': 'field_dropdown',
          //         'name': 'DIRECTION',
          //         'options': [
          //             ['En avant', Blockly.Gamepad['INPUTS']['FORWARD']],
          //             ['A droite ↻', Blockly.Gamepad['INPUTS']['RIGHT']],
          //             ['A gauche ↺', Blockly.Gamepad['INPUTS']['LEFT']]
          //         ]
          //     },
//               {
//                   'type': 'input_dummy'
//               },
//               {
//                   'type': 'input_statement',
//                   'name': 'DO'
//               },
//               {
//                   'type': 'input_statement',
//                   'name': 'ELSE'
//               }
//               ],
//               'previousStatement': null,
//               'nextStatement': null,
//               'colour': 180
//           }
//       },
//       'turn': {
//           // the request will be { method: 'TURN', args: [ Blockly.Gamepad['INPUTS']['...some direction'] ]}
//           method: 'TURN',
//           args: [{
//               field: 'DIRECTION',
//               get: parseInt
//           }],
          // json: {
          //     'message0': 'Tourner %1',
          //     'args0': [{
          //         'type': 'field_dropdown',
          //         'name': 'DIRECTION',
          //         'options': [
          //             ['Droite ↻', Blockly.Gamepad['INPUTS']['RIGHT']],
          //             ['Gauche ↺', Blockly.Gamepad['INPUTS']['LEFT']]
          //         ]
          //     }],
          //     'previousStatement': null,
          //     'nextStatement': null,
          //     'colour': 180
          // }
//       },
      // 'move': {
      //     // the request will be { method: 'MOVE', args: [] ]}
      //     method: 'MOVE',
      //     json: {
      //         'message0': 'Avancer',
      //         'previousStatement': null,
      //         'nextStatement': null,
      //         'colour': 180
      //     }
      // },
//       'start':{
//         json:{
//           'message0': 'Commencer',
//           'nextStatement': null,
//           "colour": 26
//         }
//       } 
//   }
// })
// adds

var blocklyArea = document.getElementById('midlExpends');
var blocklyDiv = document.getElementById('blocklyDiv');
var workspace = Blockly.inject('blocklyDiv',
    {
      toolbox: toolbox,
      toolboxPosition: 'start',
      horizontalLayout: false,
      // disable: true,
      // collapse:true,
      // theme:{
      // // 'base': Blockly.Themes.Classic,
      // // 'css': true,
      // // 'componentStyles': {
      // //   // 'workspaceBackgroundColour': '#000',
      // //   // 'toolboxBackgroundColour': 'blackBackground',
      // //   // 'toolboxForegroundColour': '#fff',
      // //   // 'flyoutBackgroundColour': '#252526',
      // //   // 'flyoutForegroundColour': '#ccc',
      // //   // 'flyoutOpacity': 0.4,
      // //   // 'scrollbarColour': '#000',
      // //   // 'insertionMarkerColour': '#fff',
      // //   // 'insertionMarkerOpacity': 0.3,
      // //   // 'scrollbarOpacity': 0.4,
      // //   // 'cursorColour': '#d0d0d0',
      // //   // 'blackBackground': '#333',
      // //   },
      // },
    });

  

// workspace.setTheme(theme);

var onresize = function(e) {
  // Compute the absolute coordinates and dimensions of blocklyArea.
  var element = blocklyArea;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  Blockly.svgResize(workspace);
};
window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(workspace);

// Returns an arry of XML nodes.
// var coloursFlyoutCallback = function(workspace) {
//   // Returns an array of hex colours, e.g. ['#4286f4', '#ef0447']
//   var colourList = getPalette();
//   var blockList = [];
//   for (var i = 0; i < colourList.length; i++) {
//     var block = document.createElement('block');
//     block.setAttribute('type', 'colour_picker');
//     var field = document.createElement('field');
//     field.setAttribute('name', 'COLOUR');
//     field.innerText = colourList[i];
//     block.appendChild(field);
//     blockList.push(block);
//   }
//   console.log(blockList);
//   return blockList;
// };

// Associates the function with the string 'COLOUR_PALLET'
// workspace.registerToolboxCategoryCallback(
//     'COLOUR_PALETTE', coloursFlyoutCallback);



    const gamepad = new Blockly.Gamepad({
        'start': true, // enable/disable start block
        'magicJson': true, // look at the game.js file to see how this option work
        'customHighlight': true // if false use the blockly highlight method
    }),
    gui = new Gui(),
    game = new Game(gui, gamepad)

// load the first level
game.loadLevel(levels[4])

Blockly.getMainWorkspace().addChangeListener(() => {
  game.countPress = 0;
}) 
  //   document.getElementById('nextlevel').onclick = (e) =>  {
  //     if (i + 1 === levels.length -1 ) {
  //         e.target.style.display = "none"
  //         document.getElementById('7yed').click()
  //         game.loadLevel(levels[i + 1])
  //         game.showplay() 
  //         game.hidereset()

  //     } else {
  //         e.target.style.display = "block"
  //         document.getElementById('7yed').click()
  //         game.loadLevel(levels[i + 1])
  //         i++
  //         game.showplay() 
  //         game.hidereset()
  //     }
  // }


  // document.getElementById('play').onclick = () => game.loadCode() + console.clear() + gamepad.play() + game.hideplay() + game.showreset()

