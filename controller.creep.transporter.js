const Controller = require('controller');
//var RoleDriller = require('role.driller');

//Controllers will be a set of creeps

class TransporterController extends Controller {
	constructor(room) {
		super();

	}


	run(){
		for(const creep of this.controllers) {
			role(creep);
		}
	}
	addCreep(myCreep){
		this.controllers.add(myCreep);
		console.log(myCreep.name);
	}
	role(myCreep){
        if(creep.carry.energy < creep.carryCapacity) {
            var container = Game.getObjectById('578d29a931335c4e60bdba84');
            var targets = [container];
            if(targets.length > 0) {
                if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else {
                creep.moveTo(Game.flags.Flag1);
            }
            /*if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }*/
            }
            else {
                
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }
                else {
                    creep.moveTo(Game.spawns.DCOS);
                }
            }

        }

    }

    module.exports =  TransporterController;