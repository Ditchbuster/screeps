const Controller = require('controller');
var RoleDriller = require('role.driller');

//Controllers will be a set of creeps

class DrillerController extends Controller {
	constructor(room) {
		super();

	}


	run(){
		for(const creep of this.controllers) {
			RoleDriller.run(creep);
		}
	}

}

module.exports =  DrillerController;