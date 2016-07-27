/*
controls the controllers in the room

*/
const SourceController = require('controller.source');
const CreepController = require('controller.creep');
const SpawnController = require('controller.spawn');
const C = require('constants');


class RoomController {

    constructor(room) {

        this.room = room;
        this.sourceController = new SourceController(this.room);
        this.creepController = new CreepController(this.room);
        this.spawnController = new SpawnController(this.room);

        this.spawnList = []; //list of requested creeps to be spawned
        //this.requestSpawn('harvester');
    }

    run(){

        this.sourceController.run();
        this.creepController.run();

        if(this.creepController.creepNumber(C.DRILLER) == 0 && this.creepController.creepNumber(C.HARVESTER) == 0){
            this.requestSpawn(C.HARVESTER);
        }else{
            for(var name in this.room.memory.sources.ids){
                if(this.room.memory.sources.ids < 2){
                    this.requestSpawn(C.DRILLER);
                }
            }
        }

        
        this.spawnController.pushSpawnList(this.spawnList);
        this.spawnController.run();
    }
/*  creepType should be the type of creep being requested to spawn from the creep controller
    Roomcontroller will sort list as part of the run() and pass sorted array to Spawn controller
    */
    requestSpawn(creepType){ 
        this.spawnList.push(creepType);
    }

    requestPickup(creep){ 
        if(creep.memory.role == C.DRILLER || (creep.memory.role == C.HARVESTER && this.creepController.creepNumber(C.DRILLER) == 0)){
            this.sourceController.requestSource(creep);
        }else{
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && structure.energy > 0;
                }
            });
            if(targets.length > 0) {
                creep.memory.source=targets[0].id;
            }
        }
    }

    requestDropoff(creep){ //doesnt require a work
        if(creep.memory.role == C.DRILLER){ //driller try to drop to the contianer next to source
            if(this.room.memory.sources.containers[creep.memory.source]!=''){
                creep.memory.target = this.room.memory.sources.containers[creep.memory.source];
            }
        }else{
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                creep.memory.target=targets[0].id;
            }
        }
    }

    requestWork(creep){ //requires a WORK part

    }
}

module.exports =  RoomController;