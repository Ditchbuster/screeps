var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleTransporter = require('role.transporter');
var roleDriller = require('role.driller');
var helper = require('helper');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    /*****************AUTO SPAWN*************************/
    if (Game.spawns.DCOS.spawning == null){
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    //console.log(harvesters.length + ' ' + Game.spawns.DCOS.canCreateCreep([WORK,CARRY,MOVE]));
    if(harvesters.length < 0 && !Game.spawns.DCOS.canCreateCreep([WORK,WORK,CARRY,MOVE,MOVE])){
        var newName = Game.spawns.DCOS.createCreep([WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester', isHarvesting: false});
        console.log('Spawning new harvester: ' + newName);
    }
    else {
        var drillers = _.filter(Game.creeps, (creep) => creep.memory.role == 'driller');
        if (drillers.length < 1 && !(Game.spawns.DCOS.canCreateCreep([WORK,WORK,WORK,WORK,CARRY,MOVE]))){
            var newName = Game.spawns.DCOS.createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'driller'});
            console.log('Spawning new driller: ' + newName);
        }
        var transporter = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
        if (transporter.length < 2 && !(Game.spawns.DCOS.canCreateCreep([WORK,CARRY,CARRY,MOVE,MOVE,MOVE]))){
            var newName = Game.spawns.DCOS.createCreep([WORK,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'transporter'});
            console.log('Spawning new transporter: ' + newName);
        }
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        if (builders.length < 2 && !(Game.spawns.DCOS.canCreateCreep([WORK,CARRY,MOVE,MOVE]))){
            var newName = Game.spawns.DCOS.createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
            console.log('Spawning new builder: ' + newName);
        }
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        if (upgraders.length < 3 && !(Game.spawns.DCOS.canCreateCreep([WORK,CARRY,MOVE]))){
            var newName = Game.spawns.DCOS.createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
            console.log('Spawning new upgrader: ' + newName);
        }
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        if (repairers.length < 2 && !(Game.spawns.DCOS.canCreateCreep([WORK,CARRY,MOVE]))){
            var newName = Game.spawns.DCOS.createCreep([WORK,CARRY,MOVE], undefined, {role: 'repairer'});
            console.log('Spawning new repairer: ' + newName);
        }
    }
    }
    
    
    /****************DEFENSE**************************/
    /*var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    */
    /**************CREEPS*****************************/
    helper.setHarvesting();
    
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
    }
}