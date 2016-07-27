/*
controls the sources in the room


*/
const Controller = require('controller');
const C = require('constants');

class SpawnController extends Controller {
    //const HARVESTER = [[WORK,CARRY,MOVE,MOVE],[WORK,WORK,CARRY,MOVE,MOVE]];
    //const DRILLER = [[WORK,WORK,CARRY,MOVE],[WORK,WORK,WORK,WORK,CARRY,MOVE]];

    constructor(room) {
        super();
        this.room = room;
        this.spawnList = [];
        for(var name in Game.spawns){
            if(Game.spawns[name].room.name == this.room.name){
                this.controllers.add(Game.spawns[name]);
            }
        }
    }




    run(){
        /*for(var i in this.spawnList){
            console.log(this.spawnList[i]);
        }*/
        this.controllers.forEach(this.autoSpawn.bind(this));
        /*****************AUTO SPAWN*************************/

    }

    pushSpawnList(spawnList){
        this.spawnList = spawnList;
    }

    autoSpawn(mySpawner){
        console.log(this.spawnList);
        if(mySpawner.spawning == null && this.spawnList.length > 0){
            if(!mySpawner.canCreateCreep(C.SPAWNPARTS[this.spawnList[0]][0])){
                mySpawner.createCreep(C.SPAWNPARTS[this.spawnList[0]][0],undefined,{role: this.spawnList[0], source: '',target: '', filling: false});
            }
        }
    }
    /*autoSpawn(mySpawner){
        //const HARVESTER = [[WORK,CARRY,MOVE,MOVE],[WORK,WORK,CARRY,MOVE,MOVE]];
        //const DRILLER = [[WORK,WORK,CARRY,MOVE],[WORK,WORK,WORK,WORK,CARRY,MOVE]];
        if (mySpawner.spawning == null){
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == C.HARVESTER); 

            if(harvesters.length < 2 && !mySpawner.canCreateCreep(HARVESTER[0])){
                var newName = mySpawner.createCreep(HARVESTER[0], undefined, {role: C.HARVESTER, isHarvesting: false});
                console.log('Spawning new harvester: ' + newName);
            }else {
                var drillers = _.filter(Game.creeps, (creep) => creep.memory.role == 'driller');
                if (drillers.length < 2 && !(mySpawner.canCreateCreep([WORK,WORK,WORK,WORK,CARRY,MOVE]))){
                    var newName = mySpawner.createCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'driller'});
                    console.log('Spawning new driller: ' + newName);
                }
                var transporter = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
                if (transporter.length < 2 && !(mySpawner.canCreateCreep([WORK,CARRY,CARRY,MOVE,MOVE,MOVE]))){
                    var newName = mySpawner.createCreep([WORK,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'transporter'});
                    console.log('Spawning new transporter: ' + newName);
                }
                var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
                if (builders.length < 5 && !(mySpawner.canCreateCreep([WORK,CARRY,MOVE,MOVE]))){
                    var newName = mySpawner.createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'builder'});
                    console.log('Spawning new builder: ' + newName);
                }
                var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
                if (upgraders.length < 1 && !(mySpawner.canCreateCreep([WORK,CARRY,MOVE]))){
                    var newName = mySpawner.createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
                    console.log('Spawning new upgrader: ' + newName);
                }
                var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
                if (repairers.length < 3 && !(mySpawner.canCreateCreep([WORK,CARRY,MOVE]))){
                    var newName = mySpawner.createCreep([WORK,CARRY,MOVE], undefined, {role: 'repairer', filling: false});
                    console.log('Spawning new repairer: ' + newName);
                }
                var wallrepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallrepairer');
                var targets = mySpawner.room.find(FIND_STRUCTURES, {
                    filter: object => (object.hits < object.hitsMax && object.structureType == STRUCTURE_WALL)
                });
                if (wallrepairers.length < 3 && !(mySpawner.canCreateCreep([WORK,CARRY,MOVE])) && targets.length > 0){
                    var newName = mySpawner.createCreep([WORK,CARRY,MOVE], undefined, {role: 'wallrepairer', filling: false});
                    console.log('Spawning new wallrepairer: ' + newName);
                }
                var reservers = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver');
                if (reservers.length < 2 && !(mySpawner.canCreateCreep([CLAIM,MOVE,MOVE]))){
                    var newName = mySpawner.createCreep([CLAIM,MOVE,MOVE], undefined, {role: 'reserver'});
                    console.log('Spawning new reserver: ' + newName);
                }
            }
        }

    }*/

    //SPAWN BODY PART TIERS
    //const HARVESTER = [[WORK,CARRY,MOVE,MOVE],[WORK,WORK,CARRY,MOVE,MOVE]];

}
module.exports = SpawnController;