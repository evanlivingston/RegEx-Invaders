var width = 620,
	height = 500,
	gLoop,
	c = document.getElementById('c'), 
	//    //canvas itself 
	text = document.getElementById('input'),
	ctx = c.getContext('2d');
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
			ctx.fillText("lives: " + this.lives, 520, 16);
		}
}

function enemy() {
	
	this.x = (Math.random() * width);
	this.y = -10;
	this.text = "all la a la"; 
	this.dead = false;

	this.update = function() {
		if (this.y > height) {
			this.dead = true;
			hud.lives = hud.lives - 1;
		}
		if (text.value.length > 0 && text.value.charAt(text.value.length-1) !== '?') {
			//this.re = RegExp(text.value , 'g');
			try {
				this.re = RegExp(text.value, 'g');
			} catch(e) {
				this.re = RegExp('/', 'g');
			}
		} else {
			//this.re = RegExp('/', 'g');
			this.re = RegExp('/', 'g');
		}
		while (this.m = this.re.exec(this.text)) {
			this.string="";
			this.index = this.m.index; 
			this.string = " ".times(this.index).concat(this.m);
			ctx.fillStyle = "white";
			ctx.fillText(this.string, this.x, this.y);
		}
		this.y++;
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
