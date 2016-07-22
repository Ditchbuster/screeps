var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleTransporter = require('role.transporter');
var roleDriller = require('role.driller');
var roleWallRepairer = require('role.wallrepairer');
var roleAttacker = require('role.attacker');
var roleReserver = require('role.reserver');
var kernel = require('kernel');
var helper = require('helper');

module.exports.loop = function () {

    if(kernel.init()){
        kernel.garbageClean();

        kernel.setupControllers();

        kernel.run();




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
    
}
}