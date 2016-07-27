/*
controls the creeps in the room



*/
const Controller = require('controller');
const C = require('constants');
const Harvester = require('controller.creep.harvester');
const Driller = require('controller.creep.driller');
const Transporter = require('controller.creep.transporter');

class CreepController extends Controller {
    
    constructor(room) {
        super();
        this.room = room;
        this.CreepControllers = {[C.HARVESTER] : new Harvester(this.room), [C.DRILLER] : new Driller(this.room), [C.TRANSPORTER] : new Transporter(this.room)};

        this.creeps = room.find(FIND_MY_CREEPS);
        for(var i in this.creeps){
            if(this.creeps[i].memory.role){

                this.CreepControllers[this.creeps[i].memory.role].addCreep(this.creeps[i]);
            }
        }    

    }

    run(){

        console.log('CreepController running');
        for(var name in this.CreepControllers){
            this.CreepControllers[name].run();
        }
    }

    creepNumber(creepType){
        return this.CreepControllers[creepType].size();
    }
}

module.exports =  CreepController;