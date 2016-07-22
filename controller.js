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
}

module.exports = Controller;