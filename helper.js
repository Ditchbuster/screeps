/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('helper');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    setHarvesting: function() {
        Memory.harvesting.isHarvesting = false;
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        //console.log(harvesters.length);
        for(var name in harvesters){
            var creep = harvesters[name];
            if(creep.memory.isHarvesting==true){
                Memory.harvesting.isHarvesting=true;
                //console.log(creep.name+ ' is harvesting');
            }
        }
        
        return(Memory.harvesting.isHarvesting);
    },
    
    listCreeps: function() {
        for(var name in Game.creeps){
            var creep = Game.creeps[name];
            console.log(creep.name + ' ' + creep.memory.role);
        }
    }
};