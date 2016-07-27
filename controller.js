class Controller {
	constructor() {
		this.controllers = new Set();
	}

	addController(controller) {
		this.controllers.add(controller);
		return controller;
	}

	removeController(controller) {
		this.controllers.delete(controller);
	}

	size(){
		return(this.controllers.size);
	}
}

module.exports = Controller;