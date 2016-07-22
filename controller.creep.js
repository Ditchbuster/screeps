/*
controls the creeps in the room



*/
const Controller = require('controller');
const C = require('constants');
const CreepControllers = {};//{[C.HARVESTER]: require(controller.creep.harvester)};
var Harvester = require('controller.creep.harvester');

class CreepController extends Controller {
    constructor(room) {
        super();
        this.room = room;
        CreepControllers[C.HARVESTER] = new Harvester(this.room);

        this.creeps = room.find(FIND_MY_CREEPS);
        for(var i in this.creeps){
            if(this.creeps[i].memory.role){
                CreepControllers[this.creeps[i].memory.role].addCreep(this.creeps[i]);
            }
        }    

    }

    run(){
        for(var name in CreepControllers){
            CreepControllers[name].run();
        }
    }
}

module.exports =  CreepController;