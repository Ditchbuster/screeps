/*
controls the sources in the room

source tiers:   0: starting
                1: container
                3: link

a
*/
const Controller = require('controller');
const C = require('constants');

class SourceController extends Controller {
    constructor(room) {
        super();
        this.room = room;
        this.sourceId = {};
        this.sourceContainer = {};
        if(!room.memory.sources){ // sould only run once
            var sources = room.find(FIND_SOURCES);
            for(var name in sources){
                //console.log(sources[name].id);
                this.sourceId[sources[name].id] = 0;
                this.sourceContainer[sources[name].id] = '';

            }
            room.memory.sources = {};
            room.memory.sources.ids = this.sourceId;
            room.memory.sources.containers = this.sourceContainer;
            //this.checkContainers();
        }else{
            this.sourceId = room.memory.sources.ids;
            this.sourceContainer = room.memory.sources.containers;

        }
        for(var name in this.sourceId){
            this.sourceId[name] = 0;   
        }
        for(var name in Game.creeps){
            if(Game.creeps[name].memory.source!=""){
                this.sourceId[Game.creeps[name].memory.source]++;
            }
        }
    }

    requestSource(creep){
        console.log(creep.name + ' requesting source');
        if(creep.memory.source == ""){
            var minSource = "";
            var min =100; //a source should never have 100 assigned to it!
            for(var name in this.sourceId){
                if(this.sourceId[name]<min){
                    min = this.sourceId[name];
                    minSource = name;
                }
            }
            creep.memory.source = minSource;
            //console.log(minSource);
        }
    }

    checkContainers(){
        //Memory.area = {};
        for(var name in this.sourceContainer){
            const source = Game.getObjectById(name);
            const area =this.room.lookForAtArea(LOOK_STRUCTURES,source.pos.y-1,source.pos.x-1,source.pos.y+1,source.pos.x+1);
            //Memory.area[name] = area;
            for(var x in area){
                //Memory.area[name][x]=area[x];
                for(var y in area[x]){
                    if(area[x][y]){
                        for(var i in area[x][y]){
                            console.log(x + ' ' + y + ' ' + area[x][y][i].structureType);
                            if(area[x][y][i].structureType == STRUCTURE_CONTAINER){
                                this.sourceContainer[name] = area[x][y][i].id;
                            }
                        }
                    }
                }
            }
            if(this.sourceContainer[name] != '' && !Game.getObjectById(this.sourceContainer[name])){
                console.log('Deleting ' + this.sourceContainer[name] + ' from source: ' + name);
                this.sourceContainer[name] = '';
            }
        }
    }

    
    run(){
        /*for(var i in this.sourceId){
            //console.log(this.sourceId[i]);
            if(this.sourceId[i] < 2){
                this.room.controller.requestSpawn(C.DRILLER);
            }
        }*/
        this.checkContainers();
    }
}

module.exports =  SourceController;