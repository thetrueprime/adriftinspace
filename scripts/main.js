		//initialisation
		
		let player = {};
		let drawnstars = new Array(100);
		//event listener
		let health = 100;
		let heartsprites = {};

		function loadTextures() {
					


			
		    let playertexture = PIXI.Texture.fromImage("assets/images/player/player.png");
		    playersprite = new PIXI.Sprite(playertexture);
		    playersprite.position.x = 0;
		    playersprite.position.y = 0;  
			playersprite.width = 32;
		    playersprite.height = 64;
		    stage.addChild(playersprite); 
			
			 let te = PIXI.Texture.fromImage("assets/images/environment/shittybox.png");
		    test = new PIXI.Sprite(te);
		    test.position.x = 0;
		    test.position.y = 0;
		    stage.addChild(test);
		//HUD
			HUDcontainer = new PIXI.Container();

			for(let h = 0; h<5; h++){
			    let background = PIXI.Texture.fromImage("assets/images/hud/battery-empty.png");
			    heartspr = new PIXI.Sprite(background);
			    heartspr.position.x = 40*h;
			    heartspr.position.y = 15;
			    HUDcontainer.addChild(heartspr);
			    let hearts = PIXI.Texture.fromImage("assets/images/hud/battery-full.png");
			    heartsprites[h] = new PIXI.Sprite(hearts);
			    heartsprites[h].position.x = 40*h;
			    heartsprites[h].position.y = 15;
			    HUDcontainer.addChild(heartsprites[h]);
			}
	
			let loadingte = PIXI.Texture.fromImage("assets/images/environment/space.png"); 
			loadspri = new PIXI.Sprite(loadingte);
			loadspri.position.x = 0;
			loadspri.position.y = 0;
			loadspri.width = 1024;
			loadspri.height = 512;
			loadspri.alpha = 0;
			HUDcontainer.addChild(loadspri);

			stage.addChild(HUDcontainer);

		    //requestAnimationFrame(update);
		}
		let gamestate = "menu";
		//initalisation
		function init() {
			stage = new PIXI.Container();
			renderer = PIXI.autoDetectRenderer(
				1024,
				512, {
					view: document.getElementById("game-canvas")
				}
			);
			
			menucontainer = new PIXI.Container();
			let menubackground = PIXI.Texture.fromImage("assets/images/hud/blackbox.png");
			menu = new PIXI.Sprite(menubackground);
			let menuforeground = PIXI.Texture.fromImage("assets/images/hud/menu-splash.png");
			menufore = new PIXI.Sprite(menuforeground);
			menufore.x = 0;
			menufore.y = 0;
			menufore.width = 1024;
			menufore.height = 512;
			menu.x = 0;
			menu.y = 0;
			menu.width = 1024;
			menu.height = 512;
			menucontainer.addChild(menu);
			menucontainer.addChild(menufore);
				
			startGame();
		}
		function startGame(){
			loadTextures();
			loadWorld();
			update();
		}
		let mousex = 0;
		let mousey = 0;
		let screenmx = 0;
		let screenmy = 0;
		let screenpx = 0;
		let screenpy = 0;
		function playeractual(){
			screenpx = 512;
			screenpy = 400;
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
			console.log(angle);
			player.angle = angle;
		}

		function update() {
		    //input
		    keycheck();
		    recalculateMouse();
			playeractual();
			rotateShip();


			test.position.x = mousex-5;
			test.position.y = mousey-5;
			test.width = 10;
			test.height = 10;
				
			if(gamestate=="running"){


				stage.removeChild(playersprite);
				stage.addChild(playersprite);
				stage.removeChild(HUDcontainer);
				stage.addChild(HUDcontainer);

				//world update
				worldUpdates();


				//physics
				physicsUpdate();
				//RENDER
				//console.log("rendering");
				
				
			}

			if(gamestate == "menu"){
				stage.removeChild(HUDcontainer);
				stage.removeChild(menucontainer);
				stage.addChild(menucontainer);
			}else{
				if(typeof menucontainer !== 'undefined'){
					stage.removeChild(menucontainer);
				}
			}
			var offsetx = player.x+player.width/2-512;
			var offsety = player.y+player.height/2-400;
			stage.pivot.x = offsetx;
			stage.pivot.y = offsety;
			renderer.render(stage);
			requestAnimationFrame(update);
		}
