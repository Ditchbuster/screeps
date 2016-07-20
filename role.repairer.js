var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < 5 && creep.memory.filling == false){
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
            var targets = creep.room.find(FIND_MY_STRUCTURES, {
            filter: object => (object.hits < object.hitsMax && object.structureType == STRUCTURE_CONTAINER)
            });

            //targets.sort((a,b) => a.hits - b.hits);

            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);    
                }
            }else{
                var targets = creep.room.find(FIND_MY_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
                });

                targets.sort((a,b) => a.hits - b.hits);

                if(targets.length > 0) {
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);    
                    }
                }else{
                    creep.moveTo(32,40);
                }
            }
            
        }
    }
};

module.exports = roleRepairer;