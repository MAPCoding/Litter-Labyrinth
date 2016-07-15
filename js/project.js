//http://eas-fyphost-02.aston.ac.uk/~headstart/index.html

/////////////////////////////////////////////////////////////////
///////////////	Global Variables  //////////////////////////////
///////////////////////////////////////////////////////////////
var bin1, bin2, bin3, paper, plastic, glass, rubbish,boarder;
var keyboard, left, right ,up, down,time,gameScore1;
var platform, scoreText, button, endButton, instructions;
var score = 0;
var game = new Game(934, 1194, "Litter Labyrinth");

var starting = false;
/////////////////////////////////////////////////////////////////
///////////////	Functions //////////////////////////////////////
///////////////////////////////////////////////////////////////

function preload() {
	bin1 = new Sprite("img/paper_Bin.png", 150 , 155);
	bin2 = new Sprite("img/glass_Bin.png", 150 ,155);
	bin3 = new Sprite("img/plastic_Bin.png", 150 ,155);

	paper = new Sprite("img/paper.png", 54, 52);
	plastic = new Sprite("img/plastic.png",155, 70);
	glass = new Sprite("img/glass.png",31, 55);

	endButton = new Button("img/bbbbuton.png",244,615,440,132);
	button = new Button("img/button1.png",357,141,391,411);
	instructions = new Sprite("img/Instructions.png",934,260);
	keyboard = new Keyboard();
	left = keyboard.createLeftKey();
	right = keyboard.createRightKey();
	up = keyboard.createUpKey();
	down = keyboard.createDownKey();

	boarder = new Sprite("img/boarder.png");
	game.loadBackgroundImage('background',"img/labyrinthboardgreen.png");
	game.loadBackgroundImage('win',"img/ENDA.png");
	//game.loadBackgroundImage('maze2',"img/maze2.png");

	rubbish = paper;
}
function createMaze1(){
	//Edges
	boarder.create(50,122,830,2);
	boarder.create(50,88,33,815);
	boarder.create(841,136,33,773);
	boarder.create(48,879,823,30);
	//Inside
	boarder.create(275,126,38,102);
	boarder.create(313,195,159,32);
	boarder.create(441,229,30,117);
	boarder.create(473,307,186,40);
	boarder.create(544,197,110,33);
	boarder.create(616,126,34,67);
	boarder.create(734,126,32,42);
	boarder.create(732,256,108,35);
	boarder.create(735,370,34,239);
	boarder.create(674,475,60,33);
	boarder.create(771,570,70,38);
	boarder.create(652,681,113,35);
	boarder.create(653,775,187,37);
	boarder.create(613,595,39,217);
	boarder.create(525,595,90,37);
	boarder.create(538,411,28,128);
	boarder.create(383,511,153,30);
	boarder.create(351,413,32,126);
	boarder.create(202,396,38,40);
	boarder.create(167,398,35,200);
	boarder.create(202,562,51,37);
	boarder.create(219,600,32,176);
	boarder.create(225,684,56,39);
	boarder.create(192,809,33,68);
	boarder.create(191,776,339,37);
	boarder.create(381,684,30,91);
	boarder.create(496,684,33,92);
	boarder.create(89,774,35,36);
	boarder.create(93,661,43,35);
	boarder.create(93,291,264,45);
	boarder.create(162,195,34,96);

}
function createMaze2(){
	//game.setBackgroundImage('maze2')
	gameScore1 = score;
	score = 0;
	gameTime = time;

	//Create boarders

	//Edges
	boarder.create(50,122,830,2);
	boarder.create(50,88,33,815);
	boarder.create(841,136,33,773);
	boarder.create(48,879,823,30);
}
function create() {

	button.createButton();

	game.setBackgroundColour("FFF")
	game.setBackgroundImage('background');
	instructions.create(0,934);

	createMaze1();
	//Rubbish

	//Rules
	paper.collideWorldBounds(true);
	plastic.collideWorldBounds(true);
	glass.collideWorldBounds(true);

	boarder.setImmovable(true);

	//plastic.setDraggable(true);
	//glass.setDraggable(true);
	//paper.setDraggable(true);

	//plastic.setCollisionsOnDrag(true);
	//glass.setCollisionsOnDrag(true);
	//paper.setCollisionsOnDrag(true);

	//bin1.setDraggable(true);
	//bin1.setCollisionsOnDrag(true);



	bin1.setImmovable(true);
	bin2.setImmovable(true);
	bin3.setImmovable(true);

	//Score Board
	scoreText = new Text("0", game.gameWidth() - 230, 82, "34px", "Arial", "#FFF");

}


function hitPaperBin(paper, bin1){
	paper.kill();
	score = score + 50 ;
	rubbish = plastic;
}

function hitGlassBin(glass,bin2){
	glass.kill();

	score = score + 50 ;
	time = game.getGameTime();


	//game.loadBackgroundImage('win',"img/win.png");
	game.setBackgroundImage('background',0,0);
	game.setBackgroundImage('win',934,934);
	//boarder.children[0].kill();
	boarder.setAlpha(0);

	//createMaze2();

	endGame();
}

function endGame(){

	bin2.children[0].kill();
	bin1.children[0].kill();
	bin3.children[0].kill();


	time = time/1000;
	time = time.toFixed(1);
	//time = Math.round(time);

	scoreText = new Text("0",  710, 241, "83px", "Arial","#FFF");
	timeText = new Text("" + time, 710, 440, "80px","Arial","#FFF" );

	endButton.createButton();
	endButton.addDownAction(restart,0);
}

function hitPlasticBin(plastic, bin3){
	plastic.kill();
	score = score + 50 ;
	rubbish = glass;
}
function hitWall(plastic,paper,glasss, boarder){
	score-- ;

}
function hitWrongBin(){
	score--;
}
function start(){
		starting = true;
		button.buttonChild.kill();
		time = 0;
}
function restart(){
	endButton.kill();
	location.reload();
	gameScore1 = score;
	score = 0 ;
	time = 0;
}
function createObjects(){

	if(starting){
		paper.create(100,236);
		plastic.create(740, 826);
		glass.create(325, 134);
		bin1.create(660, 715);
		bin2.create(420, 700);
		bin3.create(110, 700);

		starting = false;
	}
}

function update() {


	button.addDownAction(start,0);
	createObjects();

	if(left.isDown()) {
		rubbish.setVelocityY(0);
		rubbish.setVelocityX(-250);
	} else if(right.isDown()) {
		rubbish.setVelocityY(0);
		rubbish.setVelocityX(250);

	} else if(down.isDown()){
		rubbish.setVelocityX(0);
		rubbish.setVelocityY(250);

	} else if(up.isDown()){
		rubbish.setVelocityX(0);
		rubbish.setVelocityY(-250);

	}
	else {
		rubbish.setVelocityX(0);
		rubbish.setVelocityY(0);

	}



	game.checkOverlap(paper,bin1,hitPaperBin);
	game.checkOverlap(plastic,bin3,hitPlasticBin);
	game.checkOverlap(glass,bin2,hitGlassBin);

	game.checkOverlap(paper,bin2,hitWrongBin);
	game.checkOverlap(plastic,bin1,hitWrongBin);
	game.checkOverlap(glass,bin3,hitWrongBin);

	game.checkOverlap(paper,bin3,hitWrongBin);
	game.checkOverlap(plastic,bin2,hitWrongBin);
	game.checkOverlap(glass,bin1,hitWrongBin);

	game.checkCollision(paper,boarder,hitWall);
	game.checkCollision(plastic,boarder,hitWall);
	game.checkCollision(glass,boarder,hitWall);

//	time++;

	scoreText.changeText(" " + score);

}
