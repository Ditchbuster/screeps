const Controller = require('controller');
//var RoleDriller = require('role.driller');

//Controllers will be a set of creeps

class DrillerController extends Controller {
	constructor(room) {
		super();

	}


	run(){
		for(const creep of this.controllers) {
			this.role(creep);
		}
	}
	addCreep(myCreep){
		this.controllers.add(myCreep);
		console.log(myCreep.name);
	}
	role(creep){
		if (this.spawning){return}
			
		if(creep.memory.source = ''){
			creep.room.controller.requestPickup(creep);
		}
		if(creep.memory.target = ''){
			creep.room.controller.requestDropoff(creep);
		}
		const source = Game.getObjectById(creep.memory.source);
		if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        	creep.moveTo(source);
        }

        creep.transfer(Game.getObjectById(creep.memory.target));
	}

	old_role(myCreep){
        if(myCreep.carry.energy < myCreep.carryCapacity) {
                var sources = myCreep.room.find(FIND_SOURCES);
                if(myCreep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    myCreep.moveTo(sources[1]);
                }
        }
        else {
            
            /*var targets = myCreep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER); //&& structure.energy < structure.energyCapacity;
                    }
            });*/
             var container =Game.getObjectById('578d29a931335c4e60bdba84');
            var targets = [container];
            if(targets.length > 0) {
                if(myCreep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    myCreep.moveTo(targets[0]);
                }
            }
        }
    }

}

module.exports =  DrillerController;