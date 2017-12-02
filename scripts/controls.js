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
	function getMousePlayerAngle(){
		let diffx = mousex-ship.x;
		let diffy = mousey-ship.y;
		if(diffx == 0){diffx=0.01};
		let angle = Math.atan(diffy/diffx);
		angle+=(Math.PI/2);
		if(diffx<0){
			angle+=Math.PI;
		}
		return angle;
	}
	function rotateShip(){
		var angle = getMousePlayerAngle();
		//slide to angle
		var speedofslide = 15;
		ship.angle = ship.angle % (Math.PI*2);
		angle = angle % (Math.PI*2);
		if(ship.angle<0){
			ship.angle = Math.PI*2+ship.angle 
		}
		if(ship.angle<angle){
			ship.anglevel = Math.PI/speedofslide;
		}
		if(ship.angle>angle){
			ship.anglevel = -Math.PI/speedofslide;
		}	
		if(ship.angle-angle>Math.PI ||ship.angle-angle<-Math.PI){
			ship.anglevel = -ship.anglevel;
		}
		if((Math.abs(ship.angle-angle))>(Math.PI/speedofslide)){
			ship.angle += ship.anglevel;
		}else{
			ship.angle = angle;
		}

	}
	function recalculateMouse(){
		
		var offsetx = ship.x+ship.width/2-WIDTH/2;
		var offsety = ship.y+ship.height/2-HEIGHT/2;
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
		let diffx =  (mousex-ship.x);
		let diffy =  (mousey-ship.y);
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
		ship.xvel += Math.cos(ship.angle-Math.PI/2)*accel;
		ship.yvel += Math.sin(ship.angle-Math.PI/2)*accel;
	}
	function reverseThrust(){
		ship.xvel*=0.9;
		ship.yvel*=0.9;
	}
	function use(){
		if(view == "exterior"){
			view = "interior";
			job = "";
		}else{

		}
	}
	function move(xv,yv){
		if(Math.abs(xv)>0)
		player.xvel = xv*20;
		if(Math.abs(yv)>0)
		player.yvel = yv*20;
	}
	function keycheck(){

		if(keylist.includes(69)){//E
			use();
		}
		if(keylist.includes(87)){//W
			if(job == "pilot"){
				thrust();
			}else if(job == "shield"){

			}else{
				move(0,-1);
			}
		}
		if(keylist.includes(65)){//A
			if(job == ""){
				move(-1,0);
			}
		}
		if(keylist.includes(68)){//D
			if(job == ""){
				move(1,0);
			}
		}
		if(keylist.includes(83)){//S
			if(job == "pilot"){
				reverseThrust();
			}else{
				move(0,1);
			}
		}
	}	


