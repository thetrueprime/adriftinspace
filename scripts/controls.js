	let weapon = 1;
	let keylist = new Array();
	
	window.addEventListener("keydown", keypress, false);
	window.addEventListener("keyup", keyup, false);
	window.addEventListener("mousemove", mousemove, false);
	window.addEventListener("click", clickm, false);
	function keypress(evt){
		var keyCode = evt.which;
		keylist.push(keyCode);
	}
	
	function rotateShip(){
		let diffx = mousex-player.x;
		let diffy = mousey-player.y;
		if(diffx == 0){diffx=0.01};
		let angle = Math.atan(diffy/diffx);
		angle+=(Math.PI/2);
		if(diffx<0){
			angle+=Math.PI;
		}

		
		//slide to angle
		var speedofslide = 30;
		player.angle = player.angle % (Math.PI*2);
		angle = angle % (Math.PI*2);
		if(player.angle<0){
			player.angle = Math.PI*2+player.angle 
		}
		if(player.angle<angle){
			player.anglevel = Math.PI/speedofslide;
		}
		if(player.angle>angle){
			player.anglevel = -Math.PI/speedofslide;
		}	
		if(player.angle-angle>Math.PI ||player.angle-angle<-Math.PI){
			player.anglevel = -player.anglevel;
		}
		if((Math.abs(player.angle-angle))>(Math.PI/speedofslide)){
			player.angle += player.anglevel;
		}else{
			player.angle = angle;
		}

	}
	function recalculateMouse(){
		
		var offsetx = player.x+player.width/2-512;
		var offsety = player.y+player.height/2-400;
		mousex = screenmx+offsetx;
		mousey = screenmy+offsety;
	}
	function mousemove(evt){
		screenmx = evt.offsetX;
		screenmy = evt.offsetY;
		
	}	
	function keyup(evt){
		var keyCode = evt.which;
		while(keylist.indexOf(keyCode) > -1){
			keylist.splice(keylist.indexOf(keyCode),1);
		}
		
	}
	function shoot(){
		let diffx =  (mousex-player.x);
		let diffy =  (mousey-player.y);
		let ratio = diffy/diffx;
		let speed = 100;
		let k = Math.sqrt(speed/(Math.pow((diffx),2)+Math.pow(diffy,2)));
		var mousxvel = k*diffx;
		 var mousyvel = k*diffy;
	}
	function clickm(evt){
		if(gamestate=="menu"){
			let buttonx = 400;
			let buttony = 300;
			let width = 200;
			let height = 200;
			if(evt.offsetX>buttonx && evt.offsetX<buttonx+width && evt.offsetY>buttony && evt.offsetY<buttony+height){
				gamestate = "running";	
			}
		}else{
			shoot();
		}
	}
	
	function thrust(){
		let accel = 0.1;
		player.xvel += Math.cos(player.angle-Math.PI/2)*accel;
		player.yvel += Math.sin(player.angle-Math.PI/2)*accel;
	}
	function reverseThrust(){
		player.xvel*=0.9;
		player.yvel*=0.9;
	}
	
	function keycheck(){
		
		if(keylist.includes(87)){//W
			thrust();
		}
		if(keylist.includes(83)){//S
			reverseThrust();
		}
	}	


