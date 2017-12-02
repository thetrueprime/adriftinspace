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
			/*	currentprojectile.sprite.destroy();
				currentprojectile.removed = true;
				world.projectiles.splice(world.projectiles.indexOf(currentprojectile),1);
				p--;
			//remove*/
			if(checkEntityCollisions(currentprojectile.x + currentprojectile.xvel, currentprojectile.y + currentprojectile.yvel, currentprojectile.width, currentprojectile.height, world.entitylist)){

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
				


			}
		
	}
	for (let p = 0; p < ship.crew.length; p++) {
		entity = ship.crew[p];
		entity.xvel *= 0.5;
		entity.yvel *= 0.5;
		let floorlist = ship.floorlist;
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
	//	console.log(entity.xvel+","+entity.yvel);
		//console.log(entity.x+","+entity.y);
		entity.sprite.position.x = entity.x;
		entity.sprite.position.y = entity.y;
	}
	for (let e = 0; e < world.entitylist.length; e++) {
		entity = world.entitylist[e];
		//physics

		entity.x += entity.xvel;
		entity.y += entity.yvel;
		if (entity.entitytype == "ship") {
			shipsprite.position.x = entity.x;
			shipsprite.position.y = entity.y;
			shipsprite.anchor.set(0.5, 0.5);
			shipsprite.rotation = entity.angle;
		}else{
			entity.sprite.position.x = entity.x;
			entity.sprite.position.y = entity.y;
			entity.sprite.rotation = entity.angle;
		}

	}

}
