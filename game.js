var width = 1024,
	height = 500,
	gLoop,
	c = document.getElementById('c'), 
	//    //canvas itself 
	text = document.getElementById('input'),
	ctx = c.getContext('2d');
	text.focus();
	//      //and two-dimensional graphic context of the
	//      //canvas, the only one supported by all 
	//      //browsers for now
	c.width = width;
	c.height = height;
	


var clear = function(){
	ctx.fillStyle = '#222';
		  //set active color to #d0e... (nice blue)
	ctx.clearRect(0, 0, width, height);
		  ////clear whole surface
	ctx.beginPath();
		  //  //start drawing
	ctx.rect(0, 0, width, height);
		  //    //draw rectangle from point (0, 0) to
		  //    //(width, height) covering whole canvas
	ctx.closePath();
		  //      //end drawing
	ctx.fill();
	}

var hud = function(){
		this.lives = 10;
		this.update = function() {
				
			//ctx.fillText(text.value, 520, 30);

		}

		this.draw = function() {
			ctx.fillStyle = "green";
			ctx.font = "bold 16px Courier";
			ctx.fillText("lives: " + this.lives, 920, 16);
		}
}

function enemy() {
	
	this.x = (Math.random() * width - 200) + 100;
	this.y = (Math.random() * -280);
	this.text = "all la a la"; 
	this.dead = false;

	this.update = function() {
		this.ends_with_ast = false;
		if (this.y > height) {
			this.dead = true;
			hud.lives = hud.lives - 1;
		}
		if (text.value.length > 0 && text.value.charAt(text.value.length-1) !== '?') {
			//this.re = RegExp(text.value , 'g');
			try {
				if ( text.value.charAt(text.value.length-1) == '*') {
					this.re = RegExp(text.value);
					this.ends_with_ast = true;
					console.log('ends with *');
				}
				else {
					this.re = RegExp(text.value, 'g');
				}
			} catch(e) {
				this.re = RegExp('/', 'g');
			}
		} else {
			this.re = RegExp('/', 'g');
		}
		this.string = "";
		while ((this.m = this.re.exec(this.text)) && this.ends_with_ast == false) {
		
			this.index = this.m.index; 
			this.space = " ".times(this.index - this.string.length);
			this.string = (this.string.concat(this.space.concat(this.m)));
			//console.log("string = " + this.string + " | match = " + this.m + " | index = " + this.index + " | string.lengh = " + this.string.length);
			if (this.m == this.text) {
				this.dead == true;
				enemies.splice(this, 1);
				document.getElementById('input').value = "";
			}
		}
		if (this.ends_with_ast) {
			console.log('ends with *');
			this.test = this.re.exec(this.text);
			console.log(this.test);
			this.string = this.test;
			if (this.test == this.text) {
				console.log('DEAD');
				this.dead == true;
				enemies.splice(this, 1);
				document.getElementById('input').value = "";
			}
		}
		
		ctx.fillStyle = "yellow";
		ctx.fillText(this.string, this.x, this.y);
	//	if (this.string == this.text) {
	//		this.dead == true;
	//		enemies.splice(this, 1);
	//		document.getElementById('input').value = "";
	//		if (enemies[this]) {
	//			enempies[this].pop;
	//		}
	//	}
		this.y = this.y + .5;
	}

	this.draw = function() {
		ctx.fillStyle = "green";
		ctx.font = "bold 16px Courier";
		ctx.fillText(this.text, this.x, this.y);

	}	

}

String.prototype.times = function(n) {
	return Array.prototype.join.call({length:n+1}, this);
}
					


var numberOfEnemies = 4,enemies = [];
for (var i = 0; i < numberOfEnemies; i++)
	enemies.push(new enemy());
hud = new hud();


var GameLoop = function() { 
	clear();
	hud.draw();
	hud.update();


	for (var en in enemies) {
		enemies[en].draw();
		enemies[en].update();
		if (enemies[en].dead == true) {
			enemies.splice(en, 1)
		}
	}
	
	if (enemies.length < 2) {			
		enemies.push(new enemy());
	}	
	gLoop = setTimeout(GameLoop, 1000 / 50);
}

GameLoop();
