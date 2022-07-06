/* --- Game class --- */
//
// this class:
//  - manage the requests
//  - update the game (json)
//  - manage the gui
//  - load the levels
class Game {
    // the gamepad is passed to the contructor
    constructor(gui, gamepad) {
        // link the game
        gamepad.setGame(this, this.manageRequest)

        // set the gamepad and the gui
        this.gamepad = gamepad
        this.gui = gui
        this.btnPlayPressed = false
        this.chargers = new Array()
    }

    /* --- Game handlers --- */

    // all the requests are passed to this function
    manageRequest(request, back, old) {
        let result, promise

        // if a method is called and the request is not old the game is updated
        //
        // using the 'magicJson' options the json need to be changed only the first
        // time the request is passed to this function
        //
        // if the request is old the json will be automatically updated before the request is passed
        // to this function 
        //
        // infact, in the methods's handlers below, the 'back' argument is not passed 
        // and there's no code to remove the changes of the json on back requests
        if (['PATH', 'REPEAT', 'TURN', 'MOVE'].includes(request.method) && !old)
            // update the game
            result = this[request.method].apply(this, [].concat(request.args, request))
            // console.log(request)
            // console.log(result)
          
        // check the game status
        this.checkGameStatus(request, back, old)

        // update the gui
        promise = this.gui.manageRequest(request, back)
        // you can return a promise
        return promise.then(() => result)
    }

    // load a level
    loadLevel(level, restore=true) {
        // this.countPress = 0;
        this.loaded = false;
        var start = true;
        // update maxBlocks setting
        if ('maxBlocks' in level)
            // if the start block is used add 1
            Blockly.getMainWorkspace().options.maxBlocks = level.maxBlocks + (start ? 1 : 0)
        else
            // no max
            Blockly.getMainWorkspace().options.maxBlocks = Infinity

        // update the toolbox
        if ('blocks' in level)
            // load some blocks/categories from the xml
            this.gamepad.setToolbox({
                blocks: level.blocks,
                // procedure: false,
                // variable :  false,
            })
        else
            // load all the blocks/categories from the xml
            this.gamepad.setToolbox({
                all: true
            })
        

        // update the magicJson
        this.gamepad.level = level.game
        // set the id
        this.id = level.id

          // chargers
          if ("chargers" in levels[this.id - 1 ]) this.chargers = copy(level.chargers) 
          else this.chargers = undefined   

          // enemies
          if ("enemies" in levels[this.id - 1 ]) this.enemies = copy(level.enemies) 
          else this.enemies = undefined
        
        
        // load the gui
        this.gui.load(this.id, this)
        // reset the workspace and kill the requests of the previous game if it wasn't finished
        // this.gamepad.reset()
        this.onReset()
        // restore the old code from the localStorage
        if(restore) this.onRestore('' + this.id + start)
        // this.gamepad.restore()
        
    }


    onReset(){
        // console.log("reset")
        this.gamepad.reset()
    }

    onRestore(str){
        this.gamepad.restore(str)
    }




    
    hideplay(){
        document.getElementById("play").style.display = "none"
    }
    showplay(){
        document.getElementById("play").style.display = "block"
    }
    hidereset(){
        document.getElementById("reset").style.display = "none"
    }
    showreset(){
        document.getElementById("reset").style.display = "block"
    }
    


    // load the code
    loadCode() {
        var start = true
        // load the code, the json is resetted
        this.gamepad.load()
        this.loaded = true
        // save the code in localStorage
        this.gamepad.save('' + this.id + start)
        // reset the gui
        this.gui.load()
        // load first 'START' request
        this.gamepad.forward()
    
        this.correctionCode = getcode(clean(Blockly.JavaScript.workspaceToCode()));

        function clean(a) {
            for (var i = 0, _pj_a = a.length; (i < _pj_a); i += 1) {
            if ((a.slice(i, (i + 2)) === "id")) {
              a = a.split(a.slice(i, (i + 26))).join('');
            }
            }
            a = a.split("'PATH'").join("PATH");
            a = a.split("'TURN'").join("TURN");
            a = a.split("'MOVE'").join("MOVE");
            a = a.split("'REPEAT'").join("REPEAT");
            a = a.split("await worker.setRequest").join("");
            a = a.split("\n").join("/n");
            a = a.split(" ").join("");
            return a;
            }
            function getcode(req) {
            var code;
            code = [];
            for (var i = 0, _pj_a = req.length; (i < _pj_a); i += 1) {
            if ((req.slice(i, (i + 2)) === "if")) {
              code += ["if"];
            }
            if ((req.slice(i, (i + 5)) === "while")) {
              code += ["while"];
            }
            if ((req.slice(i, (i + 13)) === "PATH,args:[0]")) {
              code += ["(ispathahead()){\n"];
            }
            if ((req.slice(i, (i + 13)) === "PATH,args:[1]")) {
              code += ["(ispathright()){\n"];
            }
            if ((req.slice(i, (i + 13)) === "PATH,args:[3]")) {
              code += ["(ispathleft()){\n"];
            }
            if ((req.slice(i, (i + 13)) === "TURN,args:[1]")) {
              code += ["turnRight();\n"];
            }
            if ((req.slice(i, (i + 13)) === "TURN,args:[3]")) {
              code += ["turnLeft();\n"];
            }
            if ((req.slice(i, (i + 12)) === "MOVE,args:[]")) {
              code += ["moveForward();\n"];
            }
            if ((req.slice(i, (i + 14)) === "REPEAT,args:[]")) {
              code += ["(notDone()) {\n"];
            }
            if ((req.slice(i, (i + 3)) === "/n}")) {
              code += ["}\n"];
            }
            }
            return code;
            }
            
    }

    /* --- Game utils --- */

    // check the game status
    checkGameStatus(request, back, old) {
        let pegman = this.gamepad.level.pegman,
            marker = this.gamepad.level.marker
            // chargers = this.level.chargers
            // console.log(this.gamepad.level.chargers)
            // chargers = this.gamepad.level.chargers
            // this.chargers = document.getElementsByClassName("chargers_" + id)
            // this.chargers_count = document.getElementsByClassName("chargers_count")
            // this.

        // if the game is finished show win/lose alert
    
        if (request.method == Blockly.Gamepad['STATES']['FINISHED'] && !back && this.btnPlayPressed) {
            if (pegman.x == marker.x && pegman.y == marker.y)
                if (this.id === levels.length -1 ) {
                    Swal.fire({
                        title: "Congrats, you successed",
                        icon: "success",
                        showCloseButton: true,
                    })
                } else {
                    Swal.fire({
                        title: "Félicitations, vous avez réussi",
                        html:"<p>le code pour valider le niveau: <strong id='CodeLevel'>1243322</strong></p><button class='Copy' onclick='copyToClipBoard()'>Copier</button>",
                        icon: "success",
                        // confirmButtonText: "Niveau suivant",
                        showCloseButton: true,
        
                      }).then((result) => {  
                        /* Read more about isConfirmed, isDenied below */  
                        // if (result.isConfirmed) {
                        //     this.loadLevel(levels[this.id])
                        //     var lvl=this.id-1
                        //     document.getElementById("lvl_"+ lvl).className += " pass";
                        //     // document.getElementById("rejouerbtn").style.display = "none";
                        // } 
                        
                    });
                }
            else
            Swal.fire({
                title: "Vous avez perdu!",
                icon: "error",
                confirmButtonText: "Close",
            });

        }else if(request.method == "UPDATE") {

            // this.chargers.forEach(charger => {
            //     if(pegman.x == charger.x && pegman.y == charger.y){
            //         if (charger.count > 0) 
            //             charger.count--
            //             this.gui.chargersCount[].textContent = charger.count
            //     }
            // });

            // if (this.btnPlayPressed){
            //     this.btnAvancer = true
            // }

            for (let index = 0; index < this.chargers.length; index++) {
                if(pegman.x == this.chargers[index].x && pegman.y == this.chargers[index].y && !back){
                    // this.btnAvancer = false
                    
                    this.chargers[index].count--
                    // console.log("this.chargers[index].count : " + this.chargers[index].count, "levels[this.id-1].chargers[index].count : " + levels[this.id-1].chargers[index].count)
                    // console.log(levels[this.id-1])
                    if (this.chargers[index].count > 0) {
                        
                        this.gui.chargersCount[index].textContent = this.chargers[index].count
                    }
                    else{
                        this.gui.listChargers[index].style.display = "none"
                        this.gui.chargersCount[index].style.display = "none"
                        // this.btnPlayPressed = false
                    }

                }else if(pegman.x == this.chargers[index].x && pegman.y == this.chargers[index].y && back){
                    // this.btnReculer = false
                    this.chargers[index].count++
                    // console.log(levels[this.id-1].chargers.count)
                    if (this.chargers[index].count > 1) {
                        // this.chargers[index].count++
                        this.gui.chargersCount[index].textContent = this.chargers[index].count
                        
                    }
                    else{
                        this.gui.chargersCount[index].textContent = this.chargers[index].count
                        this.gui.listChargers[index].style.display = "block"
                        this.gui.chargersCount[index].style.display = "block"
                        // this.chargers[index].count++
                        // this.chargers[index].count++
                        
                    }
                }
                
                
            }

        } else {
            if (this.enemies && this.btnPlayPressed)
           { 
               for (let index = 0; index < this.enemies.length; index++) {
                    if (pegman.x == this.enemies[index].x && pegman.y == this.enemies[index].y)
                    {  
                        this.gamepad.pause()
                        Swal.fire({
                            title: "Vous avez perdu!",
                            icon: "error", 
                            confirmButtonText: "Close",
                        });
                    }
                }
            }
        }

        
  

        // log the request and the pegman
        // the pegman is parsed to look better in the console because gamepad.level is not a normal object (see documentation)
        console.group()
            console.info('request:      ', request)
            console.info('request type: ', back ? 'backward' : 'forward')
            console.info('request age:  ', old ? 'old' : 'new')
            console.info('\n')     
            console.info('pegman:       ', JSON.parse(JSON.stringify(pegman))) 
        console.groupEnd()


    }


    
    // get the { x, y } offset of the next position
    // from a given direction
    getNextPosition(direction) {
        // the direction is one of these inputs
        //
        // Blockly.Gamepad['INPUTS'] = {
        //    'FORWARD': '0',
        //    'RIGHT': '1',
        //    'BACKWARD': '2',
        //    'LEFT': '3'
        // }

        return [{
                // UP
                x: 0,
                y: 1
            },
            {
                // RIGHT
                x: 1,
                y: 0
            },
            {
                // DOWN
                x: 0,
                y: -1
            },
            {
                // LEFT
                x: -1,
                y: 0
            }
        ][direction]
    }

    // check if the pegman can update its position
    // from the given offset
    canMove(path, pegman, position) {
        let x = pegman.x + position.x,
            y = pegman.y + position.y

        // check if the path exist
        return path.find(element => element[0] == x && element[1] == y) != undefined
    }

    /* --- Game methods --- */
    //
    // with the 'magicJson' options these methods will be called only if the
    // request is not old
    //
    // infact in these methods there's no code to change the json on back requests
    // because it will be automatically updated on all the old requests

    // 'repeat until' method
    REPEAT() {
        let pegman = this.gamepad.level.pegman,
            marker = this.gamepad.level.marker

        // the return: value
        // if true the cycle continues, otherwise it stops
        // while ( value ) {...}
        return {
            return: pegman.x != marker.x || pegman.y != marker.y
        }
    }

    // 'if path' methods
    PATH(direction) {
        let path = this.gamepad.level.path,
            pegman = this.gamepad.level.pegman,
            // because of the directions's values range from 0 to 3
            // it's possible to use the direction as an offset and then use the modulus 
            // (direction is a string so it's parsed)
            // 
            // Blockly.Gamepad['INPUTS'] = {
            //    'FORWARD': '0',
            //    'RIGHT': '1',
            //    'BACKWARD': '2',
            //    'LEFT': '3'
            //}
            position = this.getNextPosition((pegman.direction + direction) % 4)

        // the return: value
        // if ( value ) {...} else {...}
        return {
            return: this.canMove(path, pegman, position)
        }
    }

    // 'move forward' method
    MOVE(request) {
        let path = this.gamepad.level.path,
            pegman = this.gamepad.level.pegman,
            position = this.getNextPosition(pegman.direction),
            canMove = this.canMove(path, pegman, position)

        // if the pegman can move the position is updated
        if (canMove) {
            pegman.x += position.x
            pegman.y += position.y
        } 

        // decorate the request with some data
        // this data will be used in the gui
        request.data = [
            // if the pegman has moved
            canMove,
            // the direction of the pegman
            pegman.direction
        ]
    }

    // 'turn' method
    TURN(direction, request) {
        // because of the directions's values range from 0 to 3
        // it's possible to increment the value and then use the modulus 
        // 
        // Blockly.Gamepad['INPUTS'] = {
        //    'FORWARD': '0',
        //    'RIGHT': '1',
        //    'BACKWARD': '2',
        //    'LEFT': '3'
        // }
        this.gamepad.level.pegman.direction += direction
        this.gamepad.level.pegman.direction %= 4
        
        // decorate the request with some data
        // the data will be used in the gui
        request.data = [
            // if the rotation is in a clockwise direction
            direction == Blockly.Gamepad['INPUTS']['RIGHT']
        ]
    }

    CHARGER(request){

    }
}