/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.wallbuilder');
 * mod.thing == 'a thing'; // true
 */

var roleWallRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < 2 && creep.memory.filling == false){
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
            filter: object => (object.hits < object.hitsMax && object.structureType == STRUCTURE_WALL)
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
                    creep.moveTo(7,24);
                }
            }
            
        }
    }
};

module.exports = roleWallRepairer;