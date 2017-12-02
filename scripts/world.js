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

function loadWorld() {
	defaultWorld();
}

function defaultWorld() {
	ship = {
		x:250,
		y:250,
		angle:Math.PI,
		xvel:0,
		yvel:0,
		anglevel:0,
		width:32,
		height:64,
		entitytype:"ship"
	}
	world.entitylist.push(ship);
}

function calculateDistance(playerX,playerY,entityX,entityY)
{
	var horizontalDis = playerX - entityX;
	var verticalDis = playerY - entityY;

	var realDistance = Math.sqrt(Math.pow(horizontalDis, 2) + Math.pow(verticalDis,2));
	return realDistance;
}

function worldUpdates() {
	for(let m = 0; m<world.interacts.length;m++){
		let interactable = world.interacts[m];
		if(rawCollide(player.x,player.y,player.width,player.height,interactable.x,interactable.y,interactable.width,interactable.height)){
			if(interactable.type == "exit"){
				//
			}
		}
	}
	
	for(let m = 0; m<world.entitylist.length;m++){
		
	}
}
