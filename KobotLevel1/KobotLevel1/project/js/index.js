// some inputs
Blockly.Gamepad['INPUTS'] = {
    'FORWARD': '0',
    'RIGHT': '1',
    'BACKWARD': '2',
    'LEFT': '3'
}

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
                    'src': 'images/marker.png',
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
                'colour': 180,
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
                'colour': 180
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
                'colour': 180
            }
        },
        'turn': {
            // the request will be { method: 'TURN', args: [ Blockly.Gamepad['INPUTS']['...some direction'] ]}
            method: 'TURN',
            args: [{
                field: 'DIRECTION',
                get: parseInt
            }],
            json: {
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
        }
    }
})

// create the workspace
// Blockly.inject('blockly-div', {
//     toolbox,
//     toolboxPosition: 'start',
//     horizontalLayout: false,
// })

// var blocklyArea = document.getElementById('blockly-editor');
//   var blocklyDiv = document.getElementById('blockly-div');
//   var workspace = Blockly.inject(blocklyDiv,
//       {toolbox: document.getElementById('toolbox')});
//   var onresize = function(e) {
//     // Compute the absolute coordinates and dimensions of blocklyArea.
//     var element = blocklyArea;
//     var x = 0;
//     var y = 0;
//     do {
//       x += element.offsetLeft;
//       y += element.offsetTop;
//       element = element.offsetParent;
//     } while (element);
//     // Position blocklyDiv over blocklyArea.
//     blocklyDiv.style.left = x + 'px';
//     blocklyDiv.style.top = y + 'px';
//     blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
//     blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
//     Blockly.svgResize(workspace);
//   };
//   window.addEventListener('resize', onresize, false);
//   onresize();
//   Blockly.svgResize(workspace);

// create the gamepad and the game
const
    gamepad = new Blockly.Gamepad({
        'start': start, // enable/disable start block
        'magicJson': true, // look at the game.js file to see how this option work
        'customHighlight': true // if false use the blockly highlight method
    }),
    gui = new Gui(),
    game = new Game(gui, gamepad)

// add debug options in the blocks context menu
const populate_ = Blockly.ContextMenu.populate_;
Blockly.ContextMenu.populate_ = function (options, rtl) {
    options = options.concat(
        {
            text: 'Set as breakpoint (forward)',
            enabled: true,
            callback: async () => {
                // decrease times
                guiData.time /= 10
                guiData.lotOfTime /= 10
                // debug
                await gamepad.debug(Blockly.selected.id, false)
                // restore times
                guiData.time *= 10
                guiData.lotOfTime *= 10
            }
        },
        {
            text: 'Set as breakpoint (backward)',
            enabled: true,
            callback: async () => {
                // decrease times
                guiData.time /= 10
                guiData.lotOfTime /= 10
                // debug
                await gamepad.debug(Blockly.selected.id, true)
                // restore times
                guiData.time *= 10
                guiData.lotOfTime *= 10
            }
        })

    return populate_.apply(Blockly.ContextMenu, [options, rtl])
}

// load the level
game.loadLevel(levels[id])




