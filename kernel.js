const RoomController = require('controller.room');
Room.prototype.controller;

module.exports = {
    init: function() {
        if(!Memory.primaryRoom){
            if(Object.keys(Game.spawns).length > 0){
                var primaryRoom = _.values(Game.spawns)[0].room;
                Memory.primaryRoom = primaryRoom.name;
                Memory.myRooms = [primaryRoom.name];
                primaryRoom.memory.stage = 1;

                console.log('Initialization complete');
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

    setupControllers: function(){ // will need to have a list of rooms to setup Room controllers for
        this.primaryRoom = Game.rooms[Memory.primaryRoom];

        for(var i in Memory.myRooms){ // will need to check and deal with when room isnt visible but i want a controller 
            Game.rooms[Memory.myRooms[i]].controller = new RoomController(Game.rooms[Memory.myRooms[i]]);
        }
        
    },

    run: function(){
        //this.controllers.forEach(function(item) {item.run();});
        for(var i in Memory.myRooms){ // will need to check and deal with when room isnt visible but i want a controller 
            Game.rooms[Memory.myRooms[i]].controller.run();
        }
    }

/*
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
*/

    
};