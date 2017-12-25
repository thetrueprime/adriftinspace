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
		entitytype:"ship",
		crew:[],
		floorlist:[
			///*
			{x:200,y:0,width:400,height:50},
			{x:200,y:0,width:100,height:300},
			{x:0,y:250,width:300,height:50},
			{x:0,y:250,width:50,height:200},
			{x:0,y:450,width:500,height:50},
			{x:450,y:0,width:50,height:500}
			
			//terminal test*/


		],
		terminals:[
			{name:"pilot",x:300,y:50,width:150,height:50},
			{name:"shields", x:50,y:300,width:50,height:150}
		]
	}
	player = {
		x:350,
		y:100,
		xvel:0,
		yvel:0,
		width:16,
		height:16,
		entitytype:"player",
		username:"prime",
		sprite:playersprite
	}
	ship.crew.push(player);
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
