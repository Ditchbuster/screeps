/*
controls the sources in the room

source tiers:   0: starting
                1: container
                3: link


*/
const Controller = require('controller');

class SourceController extends Controller {
  constructor(room) {
    super();
    this.room = room;
    this.sourceId = [];
    if(!room.memory.sources){
        var sources = room.find(FIND_SOURCES);
        for(var name in sources){
            console.log(sources[name].id);
            this.sourceId[name]=sources[name].id;
            room.memory.sources = this.sourceId;
        }


    }else{
        this.sourceId = room.memory.sources;
    }

}



run(){

}
}

module.exports =  SourceController;