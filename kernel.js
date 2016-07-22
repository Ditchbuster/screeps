const sourcesController = require('controller.source');
const spawnController = require('controller.spawn');
const creepController = require('controller.creep');
var controllers = new Set;


module.exports = {
    init: function() {
        if(!Memory.primaryRoom){
            if(Object.keys(Game.spawns).length > 0){
                var primaryRoom = _.values(Game.spawns)[0].room;
                Memory.primaryRoom = primaryRoom.name;
                primaryRoom.memory.stage = 1;
                console.log('Primary room: ' + primaryRoom.name);
                return true;
            }else{
                return false;
            }
        }
        else{
            return true;
        }
    },

    garbageClean: function(){
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    },

    setupControllers: function(){
        //sourceCont = new sourcesController(Game.rooms[Memory.primaryRoom]);
        controllers.add(new spawnController(Game.rooms[Memory.primaryRoom])); // need to setup for new rooms? or only when discovered?
        controllers.add(new creepController(Game.rooms[Memory.primaryRoom]));

    },

    run: function(){
        controllers.forEach(function(item) {item.run();});
    },

    creepControl: function(){
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            if(creep.memory.role == 'repairer') {
                roleRepairer.run(creep);
            }
            if(creep.memory.role == 'transporter') {
                roleTransporter.run(creep);
            }
            if(creep.memory.role == 'driller') {
                roleDriller.run(creep);
            }
            if(creep.memory.role == 'wallrepairer') {
                roleWallRepairer.run(creep);
            }
            if(creep.memory.role == 'attacker') {
                roleAttacker.run(creep);
            }
            if(creep.memory.role == 'reserver') {
                roleReserver.run(creep);
            }
        }
    }


    
};