var me = true;
var over = false;
//防止重复落子
var chessBoard = [];
for (var i = 0; i < 15; i++) {
	chessBoard[i] = [];
	for (var j = 0; j < 15; j++) {
		chessBoard[i][j] = 0;
	}
}
var wins = [];
for (var i = 0; i < 15; i++) {
	wins[i] = [];
	for (var j = 0; j < 15; j++) {
		wins[i][j] = [];
	}
}
var count = 0;
//横线
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i][j + k][count] = true;
		}
		count++;
	}
}
//竖线
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[j + k][i][count] = true;
		}
		count++;
	}
}
//斜线
for (var i = 0; i < 11; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i + k][j + k][count] = true;
		}
		count++;
	}
}
//反斜线
for (var i = 0; i < 11; i++) {
	for (var j = 14; j > 3; j--) {
		for (var k = 0; k < 5; k++) {
			wins[i + k][j - k][count] = true;
		}
		count++;
	}
}

console.log(count);

//赢法的统计数组
var myWin = [];
var computerWin = [];

for (var i = 0; i < count; i++) {
	myWin[i] = 0;
	computerWin[i] = 0;
}

var chess = document.getElementById("chess");
var context = chess.getContext("2d");
context.strokeStyle = "#bfbfbf";
var logo = new Image();
logo.src = "img/logo.jpg";
logo.onload = function() {
	context.drawImage(logo, 420, 420, 30, 30);
	drawChessLine();
}
var drawChessLine = function() {
	for (var i = 0; i < 15; i++) {
		context.moveTo(15 + i * 30, 15);
		context.lineTo(15 + i * 30, 435);
		context.stroke();
		context.moveTo(15, 15 + i * 30);
		context.lineTo(435, 15 + i * 30);
		context.stroke();
	}
}
var oneStep = function(i, j, me) {
	context.beginPath();
	context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
	if (me) {
		//黑棋
		gradient.addColorStop(0, "#0a0a0a");
		gradient.addColorStop(1, "#636766");
	} else {
		gradient.addColorStop(0, "#d1d1d1");
		gradient.addColorStop(1, "#f9f9f9");
	}

	context.fillStyle = gradient;
	context.fill();
}
chess.onclick = function(e) {
	if (over) {
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);
	if (chessBoard[i][j] == 0) {
		oneStep(i, j, me);
		if (me) {
			chessBoard[i][j] = 1;
			for (var k = 0; k < count; k++) {
				if (wins[i][j][k]) {
					//myWin这里是个数组，如果存在一个k，使得mywin[k]=5,说明第k种赢法被实现
					myWin[k]++;
					computerWin[k] = 6;
					if (myWin[k] == 5) {
						alert("You win!!");
						over = true;
					}
				}
			}
		} else {
			chessBoard[i][j] = 2;
			for (var k = 0; k < count; k++) {
				if (wins[i][j][k]) {
					//myWin这里是个数组，如果存在一个k，使得mywin[k]=5,说明第k种赢法被实现
					myWin[k] = 6;
					computerWin[k]++;
					if (computerWin[k] == 5) {
						alert("You lose!!");
						over = true;
					}
				}
			}
		}
		me = !me;
		//每下一次都和赢法数组做一次遍历。




	}
}