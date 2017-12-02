function rawCollide(xloc, yloc, ewidth, eheight, basex, basey, width, height) {
	if ((xloc >= basex || xloc + ewidth >= basex) && (xloc <= basex + width || xloc + ewidth <= basex + width) &&
		(yloc >= basey || yloc + eheight >= basey) && (yloc <= basey + height || yloc + eheight <= basey + height)) {
		return true;
	}
	return false;
}

function whatCollided(xloc, yloc, ewidth, eheight, currentfloorlist) {

	for (let f = 0; f < currentfloorlist.length; f++) {
		let currentfloor = currentfloorlist[f];
		let basex = currentfloor.x;
		let basey = currentfloor.y;
		let width = currentfloor.width;
		let height = currentfloor.height;
		if ((xloc >= basex || xloc + ewidth >= basex) && (xloc <= basex + width || xloc + ewidth <= basex + width) &&
			(yloc >= basey || yloc + eheight >= basey) && (yloc <= basey + height || yloc + eheight <= basey + height)) {
			return currentfloor;
		}
	}

}

function checkEntityCollisions(xl,yl,wl,hl, entitylist) {
for(var e = 0; e<entitylist.length;e++){
	var entity2 = entitylist[e];
	if(rawCollide(xl,yl,wl,hl, entity2.x, entity2.y, entity2.width, entity2.height)){
		return [true,entity2];
	}
}
	return [false,null];
}
function intersectingEntity(entity1, entity2) {
	return rawCollide(entity1.x, entity1.y, entity1.width, entity1.height, entity2.x, entity2.y, entity2.width, entity2.height);
}
function checkCollision(xloc, yloc, ewidth, eheight, currentfloorlist) {

	for (let f = 0; f < currentfloorlist.length; f++) {
		let currentfloor = currentfloorlist[f];
		let basex = currentfloor.x;
		let basey = currentfloor.y;
		let width = currentfloor.width;
		let height = currentfloor.height;
		if ((xloc >= basex || xloc + ewidth >= basex) && (xloc <= basex + width || xloc + ewidth <= basex + width) &&
			(yloc >= basey || yloc + eheight >= basey) && (yloc <= basey + height || yloc + eheight <= basey + height)) {
			return true;
		}
	}

	return false;
}



function physicsUpdate() {
	for(let p = 0; p<world.projectiles.length;p++){

		let currentprojectile = world.projectiles[p];
		if(currentprojectile.type != "bullet" && currentprojectile.type != "monster"){	
			if (currentprojectile.yvel <= 10) {		
				currentprojectile.yvel+=0.98;
			}
			currentprojectile.xvel *= 0.9;
		}
		if(currentprojectile.type == "monster"){
			if(currentprojectile.time>0){currentprojectile.time-=1}else{
				currentprojectile.sprite.destroy();
				currentprojectile.removed = true;
				world.projectiles.splice(world.projectiles.indexOf(currentprojectile),1);
				p--;
			}
		}
		if(checkEntityCollisions(currentprojectile.x + currentprojectile.xvel, currentprojectile.y + currentprojectile.yvel, currentprojectile.width, currentprojectile.height, world.entitylist)[0]){
			var centity = checkEntityCollisions(currentprojectile.x + currentprojectile.xvel, currentprojectile.y + currentprojectile.yvel, currentprojectile.width, currentprojectile.height, world.entitylist)[1];
			if(centity.entitytype == "player"){
				if(currentprojectile.type == "monster"){
					if(justdamaged==0){
						health -= 20;
						justdamaged = 40;
					}
				}
			}else{
				//console.log("removing due to entity collision"+checkEntityCollisions(currentprojectile.x + currentprojectile.xvel, currentprojectile.y + currentprojectile.yvel, currentprojectile.width, currentprojectile.height, world.entitylist)[1].type);
				if(!(currentprojectile.type == "monster")){
				console.log("hit entity as projectile: "+currentprojectile.type);
				if(currentprojectile.type == "fallingblock"){
					console.log("hit entity as falling block");
					centity.health -= 10;
					if(centity.health<=0){
						centity.damagedeath = 40;
					}
				}
			
				currentprojectile.sprite.destroy();
				currentprojectile.removed = true;
				world.projectiles.splice(world.projectiles.indexOf(currentprojectile),1);
				p--;
				}
			}
			//remove
		}
			if(checkCollision(currentprojectile.x + currentprojectile.xvel, currentprojectile.y + currentprojectile.yvel, currentprojectile.width, currentprojectile.height, world.floorlist)){
				if(!(currentprojectile.type == "monster")){
				currentprojectile.sprite.destroy();
				currentprojectile.removed = true;
				world.projectiles.splice(world.projectiles.indexOf(currentprojectile),1);
				p--;
				//remove
				}
			}else{
				currentprojectile.x += currentprojectile.xvel;
				currentprojectile.y += currentprojectile.yvel;
			}
		
		if(!currentprojectile.removed){
			currentprojectile.sprite.position.x = currentprojectile.x;
			currentprojectile.sprite.position.y = currentprojectile.y;
		}
		for(let m = 0; m<world.interacts.length;m++){

				let interactable = world.interacts[m];
				if(rawCollide(currentprojectile.x,currentprojectile.y,currentprojectile.width,currentprojectile.height,
					interactable.x,interactable.y,interactable.width,interactable.height)){
					if(interactable.type == "chain"){
						if(currentprojectile.type == "bullet"){
							let floortodrop = whatCollided(interactable.x+32,interactable.y+96,interactable.width,interactable.height,world.floorlist);
							if(typeof floortodrop !== 'undefined'){
							let fallingblock = {x:floortodrop.x,y:floortodrop.y,width:floortodrop.width,height:floortodrop.height,xvel:0,yvel:0.5,type:"fallingblock",sprite:floortodrop.sprite};
							
							world.floorlist.splice(world.floorlist.indexOf(floortodrop) ,1);							
world.projectiles.push(fallingblock);	
}
						}
					}
				}


			}
		
	}
	for (let e = 0; e < world.entitylist.length; e++) {
		entity = world.entitylist[e];
		//physics
		//gravity
		if (entity.yvel <= 10) {
			//console.log("Applying gravity: "+entity.y);
			entity.yvel += 0.98;
		}
		//friction
		entity.xvel *= 0.5;

		//collision
		let floorlist = world.floorlist;
		if (checkCollision(entity.x + entity.xvel, entity.y + entity.yvel, entity.width, entity.height, floorlist)) {

			if (checkCollision(entity.x + entity.xvel, entity.y, entity.width, entity.height, floorlist)) {
				entity.xvel = 0;
				//console.log("Collided X");
				//console.log(player.xvel);
				if (checkCollision(entity.x, entity.y + entity.yvel, entity.width, entity.height, floorlist)) {
					entity.yvel = 0;
				} else {
					entity.y += entity.yvel;
				}
			} else {
				entity.yvel = 0;
				entity.x += entity.xvel;
			}
		} else {
			entity.x += entity.xvel;
			entity.y += entity.yvel;

		}

		//

		if (entity.entitytype == "player") {
			playersprite.position.x = entity.x;
			playersprite.position.y = entity.y;
		}else{
			entity.sprite.position.x = entity.x;
			entity.sprite.position.y = entity.y;
		}

	}

}
