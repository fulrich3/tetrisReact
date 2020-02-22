// Import classes
import Playfield from "./Playfield.js";
import Tetromino from "./Tetromino.js";
import Player from "./Player.js";

export default class Game {
    constructor(htmlContainerElement){
        this.htmlContainer = htmlContainerElement;
        this.playfield = new Playfield();
        this.player = new Player( this );
        this.tetromino = new Tetromino( Math.floor(Math.random() * 7) );

        this.currentInterval = 1000;
    }

    init(){
        // Create playfield
        this.playfield.init();
        this.player.init();
        
        // Create tetromino
        this.playfield.setCurrentTetromino(this.tetromino);
        this.tetromino.setPos(5,2);

        // Initial draw
        this.draw();

        // Start game
        this.start();
    }

    lowerTetromino(){
        this.tetromino.setY( this.tetromino.y + 1 );
        this.draw();
    }

    start(){
        setInterval(
            () => ( this.lowerTetromino() ), 
            this.currentInterval
        );
    }

    input(actionName){
        switch(actionName){
            case "right":
                this.tetromino.setX( this.tetromino.x + 1 );
                this.draw();
            break;
            case "left":
                this.tetromino.setX( this.tetromino.x - 1 );
                this.draw();
            break;
        }
    }
    
    draw(){
        this.htmlContainer.innerHTML = this.playfield.htmlRender();
    }
}