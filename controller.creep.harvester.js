const Controller = require('controller');
var RoleHarvester = require('role.harvester');

//Controllers will be a set of creeps

class HarvesterController extends Controller {
	constructor(room) {
		super();
		this.room = room;

	}


	run(){
		console.log('HarvesterController running');
		for(var creep of this.controllers) {
			//console.log(creep.name + ' run()');
			this.role(creep);
		}
	}
	addCreep(myCreep){
		this.controllers.add(myCreep);
		//console.log(myCreep.name);
	}
	role(creep){
		if (this.spawning){return}

		if(creep.carry.energy == 0 && creep.memory.filling == false){
            creep.memory.filling = true;
            creep.memory.target = '';
        }
        if(creep.carry.energy == creep.carryCapacity && creep.memory.filling ==true){
            creep.memory.filling = false;
            creep.memory.source = '';          
        }

		if(creep.memory.filling){
			
			if(creep.memory.source == ''){
				this.room.controller.requestPickup(creep);
				//console.log(creep.name + ': ' + creep.memory.source);
			}
			var source = Game.getObjectById(creep.memory.source);
			if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
		}else{
			if(!creep.memory.target||creep.memory.target == ''){
				this.room.controller.requestDropoff(creep);
				
			}
			var target = Game.getObjectById(creep.memory.target);
            if(target!= '' && target.energy < target.energyCapacity) { // .store needs to be taken into account
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }else{
            	creep.memory.target = '';
            }
		}

	}

}

module.exports =  HarvesterController;