var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleTransporter = require('role.transporter');
var roleDriller = require('role.driller');
var roleWallRepairer = require('role.wallrepairer');
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
        if (builders.length < 5 && !(Game.spawns.DCOS.canCreateCreep([WORK,CARRY,MOVE,MOVE]))){
            var newName = Game.spawns.DCOS.createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
            console.log('Spawning new builder: ' + newName);
        }
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        if (upgraders.length < 1 && !(Game.spawns.DCOS.canCreateCreep([WORK,CARRY,MOVE]))){
            var newName = Game.spawns.DCOS.createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
            console.log('Spawning new upgrader: ' + newName);
        }
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        if (repairers.length < 3 && !(Game.spawns.DCOS.canCreateCreep([WORK,CARRY,MOVE]))){
            var newName = Game.spawns.DCOS.createCreep([WORK,CARRY,MOVE], undefined, {role: 'repairer', filling: false});
            console.log('Spawning new repairer: ' + newName);
        }
        var wallrepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallrepairer');
        var targets = Game.spawns.DCOS.room.find(FIND_STRUCTURES, {
            filter: object => (object.hits < object.hitsMax && object.structureType == STRUCTURE_WALL)
            });
        if (wallrepairers.length < 3 && !(Game.spawns.DCOS.canCreateCreep([WORK,CARRY,MOVE])) && targets.length > 0){
            var newName = Game.spawns.DCOS.createCreep([WORK,CARRY,MOVE], undefined, {role: 'wallrepairer', filling: false});
            console.log('Spawning new wallrepairer: ' + newName);
        }
    }
    }
    
    
    /****************DEFENSE**************************/
    var tower = Game.getObjectById('578e40603ca308113b2f77b4');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => (structure.hits < structure.hitsMax && !structure.type == STRUCTURE_WALL)
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    
    /**************CREEPS*****************************/
    //helper.setHarvesting();
    
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
    }
}