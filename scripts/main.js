		//initialisation
		
		let ship = {};
		let drawnstars = new Array(100);
		//event listener
		let health = 100;
		let heartsprites = {};
		let view = "exterior";
		let WIDTH = 1600;
		let HEIGHT = 800;
		function loadTextures() {
					


			
		    let shiptexture = PIXI.Texture.fromImage("assets/images/player/player.png");
		    shipsprite = new PIXI.Sprite(shiptexture);
		    shipsprite.position.x = 0;
		    shipsprite.position.y = 0;  
			shipsprite.width = 32;
		    shipsprite.height = 64;
			stage.addChild(shipsprite);   
			
			let interiortexture = PIXI.Texture.fromImage("assets/images/interior.png");
		    interiorsprite = new PIXI.Sprite(interiortexture);
		    interiorsprite.position.x = 0;
		    interiorsprite.position.y = 0;  
			//interiorsprite.width = 32;
		    //interiorsprite.height = 64;
		    stage.addChild(interiorsprite); 
			
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
			loadspri.width = WIDTH;
			loadspri.height = HEIGHT;
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
				WIDTH,
				HEIGHT, {
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
			menufore.width = WIDTH;
			menufore.height = HEIGHT;
			menu.x = 0;
			menu.y = 0;
			menu.width = WIDTH;
			menu.height = HEIGHT;
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
			screenpx = WIDTH/2;
			screenpy = HEIGHT/2;
		}


		function update() {
		    //input
		    keycheck();
		    recalculateMouse();
			playeractual();
			//
			
		


			test.position.x = mousex-5;
			test.position.y = mousey-5;
			test.width = 10;
			test.height = 10;
				
			if(gamestate=="running"){

				if(job == "pilot"){
					rotateShip();
				}
				//world update
				worldUpdates();
				//physics
				physicsUpdate();
				//RENDER
				//console.log("rendering");
				
				stage.removeChild(shipsprite);
				stage.addChild(shipsprite);
				stage.removeChild(HUDcontainer);
				stage.addChild(HUDcontainer);
				
			}

			if(gamestate == "menu"){
				stage.removeChild(HUDcontainer);
				stage.removeChild(menucontainer);
				stage.addChild(menucontainer);
			}else{
				if(typeof menucontainer !== 'undefined'){
					stage.removeChild(menucontainer);
				}

				var offsetx = ship.x+ship.width/2-WIDTH/2;
				var offsety = ship.y+ship.height/2-HEIGHT/2;
				stage.pivot.x = offsetx;
				stage.pivot.y = offsety;
				//stage.anchor.set(0.5, 0.5);
				//console.log(player.angle);
				//stage.pivot.x = WIDTH/2;
				//stage.pivot.y = HEIGHT/2;
				//stage.rotation = player.angle;
			}
			renderer.render(stage);
			requestAnimationFrame(update);
		}
