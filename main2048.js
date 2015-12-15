var board = new Array()
var score = 0

$(document).ready(function(){
	newgame();
});

function newgame(){
	//初始化棋盘格
	init();

	//在随机两个格子里生成数字
	generateOneNumber();
	generateOneNumber();
}

//initial board
function init(){
	for (var i = 0; i <4 ; i++) {
		for (var j = 0; j < 4; j++) {
			
			var gridCell = $("#grid-cell-" + i + "-" + j );
			gridCell.css('top',getPosTop(i, j));
			gridCell.css('left',getPosLeft(i, j));
		};
	};

	for (var i = 0; i < 4; i++) {
		board[i] = new Array();
		for (var j = 0; j < 4; j++) {
			board[i][j] = 0;
		};
	};

	updateBoardView();
	score = 0;
}
//update board
function updateBoardView(){
	$(".number-cell").remove();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>')
			var theNumberCell = $('#number-cell-' + i + '-' + j);

			if (board[i][j] == 0) {
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getPosTop(i, j) + 50);
				theNumberCell.css('left',getPosLeft(i, j) + 50);
			}else{
				theNumberCell.css('width','100px');
				theNumberCell.css('height','100px');
				theNumberCell.css('top',getPosTop(i, j));
				theNumberCell.css('left',getPosLeft(i, j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
		};
	};
}

//get a random number in board
function generateOneNumber(){
	if (nospace( board )) {
		return false;
	};

	//随机一个位置
	var randx = parseInt(Math.floor(Math.random()*4));
	var randy = parseInt(Math.floor(Math.random()*4));
	// console.log(randx)
	// console.log(randy)
	while(true){
		if (board[randx][randy] == 0) {
			break;
		};

		randx = parseInt(Math.floor(Math.random()*4));
		randy = parseInt(Math.floor(Math.random()*4));
	}

	//随机一个数字
	var randNumber = Math.random() < 0.5 ? 2 : 4;
	// console.log(randNumber)
	//在随机位置显示数字
	board[randx][randy] = randNumber;
	// console.log(board[randx][randy])
	// console.log(randx,randy,randNumber)
	showNumberAnimation(randx, randy, randNumber);

	return true;
}


//get User action
$(document).keydown(function(event){
	switch(event.keyCode){
		// console.log(event.keyCode)
		case 37://left
			if(moveLeft()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 38://up
			if (moveUp()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
				// console.log(board);
			};
			break;
		case 39://right
			if (moveRight()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			};
			break;
		case 40://down
			if (moveDown()) {
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			};
			break;
		default:
			break;
	}
});



//move cube
function moveLeft(){
	if (!canMoveLeft(board)) {
		return false;
	};

	//move left
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j] != 0) {
				for (var k = 0; k < j; k++) {
					if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
						//move
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)) {
						//move
						showMoveAnimation(i, j, i, k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						// console.log("score:",score);
						document.getElementById("score").innerHTML = score;
						// $('.score')
						continue;
					}
				};
			};
		};
	};
	setTimeout("updateBoardView()",200);
	return true;
}

function moveRight(){
	if (!canMoveRight(board)) {
		return false;
	};

	//move right
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if (board[i][j] != 0) {
				for (var k = 3; k > j; k--) {
					if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
						//move
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)) {
						//move
						showMoveAnimation(i, j, i, k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						score += board[i][k];
						// console.log("score:",score);
						document.getElementById("score").innerHTML = score;
						continue;
					}
				};
			};
		};
	};
	setTimeout("updateBoardView()",200);
	return true;
}

function moveUp(){
	if (!canMoveUp(board)) {
		return false;
	};

	//move up
	for (var i = 1; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				for (var k = 0; k < i; k++) {
					if (board[k][j] == 0 && noBlockVertical(k, i, j, board)) {
						//move
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if (board[k][j] == board[i][j] && noBlockVertical(k, i, j, board)) {
						//move
						showMoveAnimation(i, j, k, j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score += board[k][j];
						// console.log("score:",score);
						document.getElementById("score").innerHTML = score;
						continue;
					}
				};
			};
		};
	};

	setTimeout("updateBoardView()",200);
	return true;
	
}

function moveDown(){
	if (!canMoveDown(board)) {
		return false;
	};

	//move down
	for (var i = 2; i >= 0; i--) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				for (var k = 3; k > i; k--) {
					if (board[k][j] == 0 && noBlockVertical(i, k, j, board)) {
						//move
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if (board[k][j] == board[i][j] && noBlockVertical(i, k, j, board)) {
						//move
						showMoveAnimation(i, j, k, j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						score += board[k][j];
						// console.log("score:",score);
						document.getElementById("score").innerHTML = score;
						continue;
					}
				};
			};
		};
	};

	setTimeout("updateBoardView()",200);
	return true;
}

function isgameover(){
	if (gameover()) {
		alert("Game Over");
	};
}


















