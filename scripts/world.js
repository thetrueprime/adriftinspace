const velGen = n => (Math.sin(n)-1)

	const stars = Array(100).fill().map(e => e = {
		x:Math.random()*1024,
		y:Math.random()*512,
		xvel: velGen(Math.random() * 2),
		yvel: velGen(Math.random() * 2),
		size: Math.random() * 2
	});	
let entities = new Array();
let inters = new Array();
let ps = new Array();

let world = {
	entitylist: entities,
	interacts: inters,
	projectiles:ps
};

function loadWorld(spawnx,spawny,filename) {
	defaultWorld();
}

function defaultWorld() {

}

function calculateDistance(playerX,playerY,entityX,entityY)
{
	var horizontalDis = playerX - entityX;
	var verticalDis = playerY - entityY;

	var realDistance = Math.sqrt(Math.pow(horizontalDis, 2) + Math.pow(verticalDis,2));
	return realDistance;
}
let bossshootability = 100;

function worldUpdates() {
	for(let m = 0; m<world.interacts.length;m++){
		let interactable = world.interacts[m];
		if(interactable.type == "key"){
			interactable.sambob+=1;
			interactable.sambob=interactable.sambob%100;
			interactable.sprite.position.y=interactable.y+(Math.cos(interactable.sambob*Math.PI/50)*10);
		}
		if(rawCollide(player.x,player.y,player.width,player.height,interactable.x,interactable.y,interactable.width,interactable.height)){
			if(interactable.type == "exit"){
				//
			}
		}
	}
	
	for(let m = 0; m<world.entitylist.length;m++){
		let entity = world.entitylist[m];
		entityBehavior(entity);
		if (entity.entitytype == "enemy"){
//			Use object atributes istead of variable names
			var distanceFrom = calculateDistance(player.x, player.y, entity.x, entity.y);
			// console.log("Distance from bug = " + distanceFrom);
			if (distanceFrom < 150){
				//console.log("Sound of bug plays!");
			}
			if(typeof entity.damagedeath !== 'undefined'){
				entity.damagedeath-=1;
				if(entity.damagedeath<=0){
					world.entitylist.splice(world.entitylist.indexOf(entity),1);
					m--;
				}
				entity.sprite.alpha = (entity.damagedeath%10)/10;
			}
		}
		
	}
	world.noise = new Array();
}
