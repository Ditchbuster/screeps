var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //creep.moveTo(0,27);
        var target = Game.getObjectById('577b93e70f9d51615fa48d8f');
        /*if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);    
                }
        ;*/
        if(creep.reserveController(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);    
        }
        /*if(creep.carry.energy < 5 && creep.memory.filling == false){
            creep.memory.filling = true;
        }
        if(creep.carry.energy == creep.carryCapacity && creep.memory.filling == true){
            creep.memory.filling = false;            
        }
        
        if(creep.memory.filling == true) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => (object.hits < object.hitsMax && object.structureType == STRUCTURE_CONTAINER)
            });

            //targets.sort((a,b) => a.hits - b.hits);

            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);    
                }
            }else{
                var targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
                });

                //targets.sort((a,b) => a.hits - b.hits);

                if(targets.length > 0) {
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);    
                    }
                }else{
                    creep.moveTo(32,40);
                }
            }
            
        }*/
    }
};

module.exports = roleAttacker;