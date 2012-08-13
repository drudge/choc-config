/*
* Javascript version of the classic Snake game
* Uses YUI 2 for dom/event handling and showing the dialogs
* Author: Saurabh Odhyan | http://odhyan.com
*
* Licensed under the Creative Commons Attribution-ShareAlike License, Version 3.0 (the "License")
* You may obtain a copy of the License at
* http://creativecommons.org/licenses/by-sa/3.0/
*
* Date: Oct 3, 2010
*/

var odhyan = window.odhyan || {}; //namespace

odhyan.SnakeGame = function() {
    var YD = YAHOO.util.Dom;

    /*
    * Constants for directions
    */
    var UP = 1,
        RIGHT = 2,
        DOWN = 3,
        LEFT = 4;

    /*
    * Constants for colors of various elements of the game
    */ 
    var BGCOLOR = "#FFF",
        SNAKECOLOR = "#8B4513",
        FOODCOLOR = "#228B22",
        POISONCOLOR = "#8B1A1A",
        BONUSCOLOR = "#FFB90F";

    /*
    * Rows and Columns Limit
    */
    var minRow = 1,
        maxRow = 37,
        minCol = 1,
        maxCol = 46;

    /*
    * @class Snake
    */
    Snake = function(r, c, dir, g) {
        this.row = r; //row of snake head
        this.col = c; //column of snake head
        this.dir = dir; //starting direction of snake movement
        this.color = SNAKECOLOR; //color of snake
        this.rowArr = []; //array that holds the rows where snake currently resides
        this.colArr = []; //array that holds the columns where snake currently resides
        this.grow = g; //positive value indicates that snake is currently in growing phase and will grow till this value becomes zero
        this.foodCount = 0; //Show bonus after eating food a specified number of times
    };

    /*
    * @class Food
    */
    Food = function(r, c, l, score) {
        this.row = r; //row of food position
        this.col = c; //column of food position
        this.len = l; //additional length this food will give to the snake
        this.score = score; //score added to total score when this food is eaten
        this.color = FOODCOLOR; //color of food
    };

    /*
    * @class Bonus
    */
    Bonus = function(r, c, score, tim) {
        this.row = r; //row of bonus position
        this.col = c; //column of bonus position
        this.score = score; //score added to total score when this bonus is taken
        this.time = tim; //how long the bonus will stay before disappearing if not eaten
        this.color = BONUSCOLOR;
    };

    /*
    * @class Poison
    */
    Poison = function(r, c) {
        this.row = r;
        this.col = c;
    };

    /*
    * Private variables
    */
    var mySnake,
        myFood,
        myBonus,
        Score = 0,
        GameSpeed = 100,
        GameID,
        gameStartDialog,
        gameOverDialog,
        PAUSE,
        START = 0;

    /*
    * Public methods
    */      
    return {

        /*
        * Initializes the dom
        * @method init
        */ 
        initDom: function() {
            var str = "";
            var row = 1,
                col = 1,
                rowId,
                cellId;

            for(r = 20; r < 460; r += 12) {
                rowId = "row" + row; 
                str += "<div id=" + rowId + ">";
                for(c = 24; c < 666; c += 14) {
                    cellId = "row" + row + "col" + col;
                    str += "<div class=cell id=" + cellId + "></div>";
                    col ++;
                }
                str += "<div class=clear></div>";
                str += "</div>";
                row ++;
                col = 1;
            }
            var el = YD.get("arena");
            el.innerHTML = str;
        },

        /*
        * Initialize game elements like key listeners, dialogs and snake object
        * @method initGame
        */
        initGame: function() {
            PAUSE = 0;
            this.initKeyListener();
            this.initGameStartDialog();
            this.initGameOverDialog();
            this.showGameStartDialog();
            mySnake = new Snake(18, 23, RIGHT, 4);
        },

        /*
        * Initializes the key listeners to listen to key presses during the game
        * @method initKeyListener
        */
        initKeyListener: function() {
            var left = new YAHOO.util.KeyListener(document, {keys:37}, this.keyLEFT),
                up = new YAHOO.util.KeyListener(document, {keys:38}, this.keyUP),
                right = new YAHOO.util.KeyListener(document, {keys:39}, this.keyRIGHT),
                down = new YAHOO.util.KeyListener(document, {keys:40}, this.keyDOWN),
                pause = new YAHOO.util.KeyListener(document, {keys:[80, 112]}, this.keyPAUSE);
            left.enable();
            up.enable();
            right.enable();
            down.enable();
            pause.enable();
        },

        /*
        * Action to perform when UP key is pressed
        * @method keyUP
        */
        keyUP: function() {
            if(PAUSE) { //don't accept keystroke is game is paused
                return;
            }
            if(mySnake.dir !== DOWN) {
                mySnake.dir = UP;
                odhyan.Snake.move(mySnake);
            }
        },

        /*
        * Action to perform when DOWN key is pressed
        * @method keyDOWN
        */
        keyDOWN: function() {
            if(PAUSE) { //don't accept keystroke is game is paused
                return;
            }
            if(mySnake.dir !== UP) {
                mySnake.dir = DOWN;
                odhyan.Snake.move(mySnake);
            }
        },

        /*
        * Action to perform when RIGHT key is pressed
        * @method keyRIGHT
        */
        keyRIGHT: function() {
            if(PAUSE) { //don't accept keystroke is game is paused
                return;
            }
            if(mySnake.dir !== LEFT) {
                mySnake.dir = RIGHT;
                odhyan.Snake.move(mySnake);
            }
        },

        /*
        * Action to perform when LEFT key is pressed
        * @method keyLEFT
        */
        keyLEFT: function() {
            if(PAUSE) { //don't accept keystroke is game is paused
                return;
            }
            if(mySnake.dir !== RIGHT) {
                mySnake.dir = LEFT;
                odhyan.Snake.move(mySnake);
            }
        },

        /*
        * Action to perform when PAUSE key is pressed
        * @method keyPAUSE
        */
        keyPAUSE: function() {
            if(PAUSE) { //if already paused
                PAUSE = 0; //resume
            } else { 
                PAUSE = 1; //pause
            }
        },

        /*
        * This method runs the game
        * @method run
        */
        run: function() {
            this.createFood();
            this.putObject(myFood);

            var th = this;

            GameID = window.setInterval(function(){
                if(START === 1 && PAUSE === 0) {
                    var ret;
                    ret = th.move(mySnake);
                    if(ret === -1) { //snake got killed
                        th.gameOver();
                    }
                    ret = th.evaluate(mySnake);
                    if(ret === -1) { //snake got killed
                        th.gameOver();
                    }
                    th.updateScore();
                }
            }, GameSpeed);
        },

        /*
        * Move the snake
        * @method move
        * @param {Object} k Our snake object
        * @return {Integer} -1 if snake gets killed else 0
        */
        move: function(k) {
            switch(k.dir) {
                case UP:
                    if(k.row > minRow) {
                        k.row --;
                    } else {
                        return -1; //collided with wall
                    }
                    break;
                case DOWN:
                    if(k.row < maxRow) {
                        k.row ++;
                    } else {
                        return -1; //collided with wall
                    }
                    break;
                case LEFT:
                    if(k.col > minCol) {
                        k.col --;
                    } else {
                        return -1; //collided with wall
                    }
                    break;
                case RIGHT:
                    if(k.col < maxCol) {
                        k.col ++;
                    } else {
                        return -1; //collided with wall
                    }
          break;
            }

            if(k.grow === 0) { //if snake is not in the growing phase then clear the tail cell to give a moving animation to the snake
                var rowEnd = k.rowArr.shift();
                var colEnd = k.colArr.shift();
                this.colorCell(rowEnd, colEnd, BGCOLOR);
            } else {
                k.grow --;
            }

            this.colorCell(k.row, k.col, k.color);
            k.rowArr.push(k.row);
            k.colArr.push(k.col);
            return 0;
        },

        /*
        * Evaluate the current state. Check if any object is hit and follow the corresponding action.
        * @method evaluate
        * @return {Integer} -1 if snake gets killed, else 0
        */
        evaluate: function() {
            if(this.selfCollision()) { //snake gets killed
                return -1;
            }

            if(mySnake.row === myFood.row && mySnake.col === myFood.col) { //food eaten
                mySnake.grow = 4;
                mySnake.foodCount ++;
                Score += myFood.score;
                this.removeObject(myFood, mySnake.color);
                this.createFood();
                this.putObject(myFood);
            } else if(myFood.score > 1) {
                myFood.score --;
            }

            if(this.bonusExists()) { //bonus exists
                if(mySnake.row === myBonus.row && mySnake.col === myBonus.col) { //bonus eaten
                    Score += myBonus.score;
                    this.removeObject(myBonus, mySnake.color);
                    myBonus.time = 0;
                } else {
                    myBonus.time --; //decrement bonus time
                    if(myBonus.time === 0) { //bonus expired, remove it
                        this.removeObject(myBonus, BGCOLOR);
                        myBonus.time = 0;
                    }
                }
            } else { //bonus doesn't exist
                if(mySnake.foodCount >= 5) { //eligible for bonus
                    this.createBonus();
                    this.putObject(myBonus);
                    mySnake.foodCount = 0;
                }
            }
            return 0;
        },

        /*
        * Method to call when game is over
        * @method gameOver
        */
        gameOver: function() {
            window.clearInterval(GameID);
            this.showGameOverDialog();
        },

        /*
        * Create new food object at an empty cell
        * @method createFood
        */
        createFood: function() {
            var row,
                col,
                len = 5,
                score = 250;
            while(true) {
                row = Math.floor(Math.random() * maxRow) + 1;
                col = Math.floor(Math.random() * maxCol) + 1;
                if(this.isEmptyCell(row, col)) {
                    myFood = new Food(row, col, len, score);
                    return;
                }
            }
        },

        /*
        * Create new bonus object at an empty cell
        * @method createBonus
        */
        createBonus: function() {
            var row,
                col,
                score = 500,
                time = 100;
            while(true) {
                row = Math.floor(Math.random() * maxRow) + 1;
                col = Math.floor(Math.random() * maxCol) + 1;
                if(this.isEmptyCell(row, col)) {
                    myBonus = new Bonus(row, col, score, time);
                    return;
                }
            }
        },

        /*
        * Check is bonus exists in the arena
        * @method bonusExists
        * @return {Boolean} TRUE is bonus exists, else FALSE
        */
        bonusExists: function() {
            if(myBonus === undefined || myBonus.row === undefined || myBonus.time === 0) { //bonus does not exist
                return false;
            } else {
                return true;
            }
        },

        /*
        * Put an object(food, poison or bonus) at the corresponding cell
        * @method putObject
        * @param {Object} o Object to put (can be food, poison or bonus)
        */
        putObject: function(o) {
            var id = "row" + o.row + "col" + o.col;
            YD.setStyle(id, "backgroundColor", o.color); 
        },

        /*
        * Remove an object from a given cell
        * @method removeObject
        * @param {Object} o Object to remove (can be food, poison or bonus)
        * @param {String} color Paint the cell with this color
        */
        removeObject: function(o, color) {
            this.colorCell(o.row, o.col, color);
        },

        /*
        * Check if a given cell is empty or not
        * @method isEmptyCell
        * @param {Integer} row Row of the given cell
        * @param {Integer} col Column of the given cell
        */
        isEmptyCell: function(row, col) {
            var id = "row" + row + "col" + col;
            var cellColor = YD.getStyle(id, "background-color");
            if(cellColor == "transparent" || cellColor == false || cellColor == "rgb(255, 255, 255)" || cellColor == BGCOLOR) { //empty cell
                return true;
            } else {
                return false;
            }
        },

        /*
        * Check if snake has collided with itself
        * @method selfCollision
        */
        selfCollision: function() {
            var i,
                len = mySnake.rowArr.length - 1; //last element of the array contains the current position so we should not compare with it
            for(i = 0; i < len; i++) {
                if(mySnake.row === mySnake.rowArr[i] && mySnake.col === mySnake.colArr[i]) { //snake collided with own body
                    return true;
                }
            }
            return false;   
        },

        /*
        * Update scorecard
        * @method updateScore
        */
        updateScore: function() {
            var el = YD.get("score");
            el.innerHTML = "Score: <i>" + Score + "</i>";
        },

        /*
        * Color a given cell
        * @method colorCell
        * @param {Integer} row Row of the given cell
        * @param {Integer} col Column of the given cell
        * @param {String} color Paint the given cell with this color
        */
        colorCell: function(row, col, color) {
            var id = "row" + row + "col" + col;
            YD.setStyle(id, "backgroundColor", color);
        },

        /*
        * Initialize the dialog box showing the message when game starts
        * @method initGameStartDialog
        */
        initGameStartDialog: function() {
            var el = document.createElement("div");
            el.innerHTML = "<div id='gameStartDialog'></div>";
            document.body.appendChild(el);

            gameStartDialog = new YAHOO.widget.Dialog("gameStartDialog", {
                fixedcenter: true,
                visible: false,
                modal: true,
                zIndex: 1000,
                draggable: false,
                underlay: false,
                close: false
            }); 
            gameStartDialog.setHeader("Snake");
            gameStartDialog.setBody("Welcome to SNAKE. </br> Press ESC or any arrow key to begin.");
            gameStartDialog.render(document.body);

            var k = new YAHOO.util.KeyListener(document, {keys:[27, 37, 38, 39, 40]}, this.hideGameStartDialog);
            k.enable();
        },

        /*
        * Initialize the dialog box showing the message when game over
        * @method initGameOverDialog
        */
        initGameOverDialog: function() {
            var el = document.createElement("div");
            el.innerHTML = "<div id='gameOverDialog'></div>";
            document.body.appendChild(el);

            gameOverDialog = new YAHOO.widget.Dialog("gameOverDialog", {
                fixedcenter: true,
                visible: false,
                modal: true,
                zindex: 1000,
                draggable: false,
                underlay: "shadow",
                close: true
            }); 
            gameOverDialog.setHeader("Snake");
            gameOverDialog.setBody("Game Over! </br> Your snake got killed. </br> Refresh the page to restart the game.");
            gameOverDialog.render(document.body);
        },

        /*
        * Show the dialog when game starts
        * @method showGameStartDialog
        */
        showGameStartDialog: function() {
            gameStartDialog.show();
        },

        /*
        * Hide the dialog when game starts
        * @method hideGameStartDialog
        */
        hideGameStartDialog: function() {
            gameStartDialog.hide();
            START = 1;
        },

        /*
        * Show the game over dialog
        * @method showGameOverDialog
        */
        showGameOverDialog: function() {
            gameOverDialog.show();
        },

        /*
        * Hide the game over dialog
        * @method hideGameOverDialog
        */
        hideGameOverDialog: function() {
            gameOverDialog.hide();
        },

        /* 
        * This method is called from outside the class to start a new game
        * @method newGame
        */
        newGame: function() {
            this.initDom();
            this.initGame();
            this.run();
        }
    };
};

YAHOO.util.Event.onDOMReady(function() { //if dom is ready
    var game = new odhyan.SnakeGame();
    game.newGame();
});