var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            //if(creep.memory.isHarvesting==true){
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            /*}else{
                if(Memory.harvesting.isHarvesting==true){
                    creep.moveTo(Games.flags.Flag1);
                }else{
                    var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0]);
                    }else{
                        creep.memory.isHarvesting==true;
                        //console.log(creep.name + ' is now harvesting')
                    }
                }
            //    creep.moveTo(Game.flags.Flag1);
            }*/
        }
        else {
            creep.memory.isHarvesting = false;
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
};

module.exports = roleHarvester;