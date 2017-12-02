		//initialisation
		
		let player = {};
		let drawnstars = new Array(100);
		//event listener
		let health = 100;
		let heartsprites = {};

		function continueLoad() {
			let floortextures = {};
					


			
		    let playertexture = PIXI.Texture.fromImage("assets/images/player/player.png");
		    playersprite = new PIXI.Sprite(playertexture);
		    playersprite.position.x = 0;
		    playersprite.position.y = 0;  
			playersprite.width = 48;
		    playersprite.height = 96;
		    stage.addChild(playersprite); 
			
			 let bosstexture = PIXI.Texture.fromImage("assets/images/enemies/boss.png");
		 bosssprite = new PIXI.Sprite(bosstexture);
		    bosssprite.position.x = 0;
		    bosssprite.position.y = 0;  
			bosssprite.width = 128;
		    bosssprite.height = 128;
		    //stage.addChild(bosssprite); 
			
			 let te = PIXI.Texture.fromImage("assets/images/environment/shittybox.png");
		    test = new PIXI.Sprite(te);
		    test.position.x = 0;
		    test.position.y = 0;
		    stage.addChild(test);
		//HUD
			HUDcontainer = new PIXI.Container();
			
			 let blackfront = PIXI.Texture.fromImage("assets/images/hud/blackbox.png");
			    blackdrop = new PIXI.Sprite(blackfront);
			    blackdrop.position.x = 0;
			    blackdrop.position.y = 0;
			    blackdrop.width = 1024;
			    blackdrop.height = 512;
		            blackdrop.alpha = 0.6;
			    HUDcontainer.addChild(blackdrop);

			thing = new PIXI.Graphics();
			thing2 = new PIXI.Graphics();
			//bottom
			thing.beginFill();
			thing.moveTo(0,512);	
			thing.lineTo(1024,512);
			thing.closePath();
			thing.endFill();
			//thing.drawCircle(0,0,300);
			//

			stage.addChild(thing);
			
			blackdrop.mask = thing;	

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

		    update();//requestAnimationFrame(update);
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
			
			
				
			
			
			/*
			let bigstart = PIXI.Texture.fromImage("assets/images/environment/star-3.png");
			bigstar = new PIXI.Sprite(bigstart);
			bigstar.position.x = 512;
			bigstar.position.y = 512;	
			let bigstart2 = PIXI.Texture.fromImage("assets/images/environment/star-3.png");
			bigstar2 = new PIXI.Sprite(bigstart);
			bigstar2.position.x = 512;
			bigstar2.position.y = 512;
			var blurf = new PIXI.filters.BlurFilter();
			blurf.blur =200;
			bigstar.filters = [blurf];
			var blurf2 = new PIXI.filters.BlurFilter();
			blurf2.blur = 100;
			bigstar2.filters = [blurf];
			stage.addChild(bigstar);
			stage.addChild(bigstar2);
			
			*/
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
			continueLoad();
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
		function update() {
		    //input
		    keycheck();
		    recalculateMouse();
			playeractual();
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
			renderer.render(stage);
			requestAnimationFrame(update);
		}
