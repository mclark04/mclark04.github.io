/* Basic Game JavaScript Code
 * Written by M.G.Clark
 * Makes some garfields on the screen that you can click on and when you let go of the mouse they move to that location
 * Until you click on them again they will keep moving to your mouse clicks.
 *  You can click on multiple and they will all chace the mouse clicks.
 */ 

/*In Index.html:
 * Loading the .json (maybe not the most important thing, sockets might have a better way to update info)
 * Loading the definition of the Unit Class (Unit.js) which holds all the actual units on the board.
 */

//const data = require('./UnitData.json');
//console.log(data);
//import unitDataFile from 'UnitData.json';

//unitData = [new Unit(unitDataFile.unitData[0].xPos, unitDataFile.unitData[0].yPos, unitDataFile.unitData[0].health, 1, 0)];

//Will want to load unitData from a json file (later to be pushed out by the server), but for now just hardcoding an Unit array
var unitData = [new Unit(30, 30, 10, 1, 0),
    new Unit(200, 200, 10, 0, 1),
    new Unit(200, 500, 15, 0, 2)];

//Will have to pass this from the server after some login system.
var CurrentPlayer = 0;

var GamesUI = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function BasicGame() {    
        Phaser.Scene.call(this, { key: 'basicgame' });
        this.units = [];
        this.map;
        this.extraStuffNotUsed;
    },

    preload: function() {
        this.load.image('dude', 'http://labs.phaser.io/assets/sprites/orange-cat1.png');
        //unitdata = JSON.parse('UnitData.json');
    },

    create: function () {    
        this.physics.world.setBoundsCollision(true, true, true, true);//Not really needed, but this makes the edges of the canvas rigid bodies
        
        for (let i = 0; i < unitData.length; i++) {
            unitData[i].obj = this.physics.add.image(unitData[i].xPos, unitData[i].yPos, 'dude').setInteractive();
            //this.physics.add.sprite(x,y,key,frame);//Use this syntax if adding animation (sprites are just multiple frames of an image)
            unitData[i].obj.on('pointerdown', function () { unitData[i].clickedOn(CurrentPlayer) });
        }

        this.input.on('pointerup', function (pointer) {
            for (let i = 0; i < unitData.length; i++) {
                if (unitData[i].isSelected) {
                    unitData[i].goTo(pointer.x,pointer.y);
                }
            }
        })
    },

    update: function () {
        for (let i = 0; i < unitData.length; i++) {
            //There has to be a more efficent way of doing this than looping over every unit 
            //but I expect it will be done on the server side so maybe looping over all units wont be as computationally expensive.
            unitData[i].move(unitData);
        }
    }
});


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    //parent: 'phaser-example',
    scene: [GamesUI],
    physics: {
        default: 'arcade'
    }
};

var game = new Phaser.Game(config);

function update() {

}