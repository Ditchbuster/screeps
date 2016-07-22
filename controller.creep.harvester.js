const Controller = require('controller');
var RoleHarvester = require('role.harvester');

//Controllers will be a set of creeps

class HarvesterController extends Controller {
	constructor(room) {
		super();

	}


	run(){
		for(const creep of this.controllers) {
			RoleHarvester.run(creep);
		}
	}
	addCreep(myCreep){
		this.controllers.add(myCreep);
		console.log(myCreep.name);
	}

}

module.exports =  HarvesterController;