var roleReserver = {

    /** @param {Creep} creep **/
    run: function(creep) {
    	var target = Game.getObjectById('577b93e70f9d51615fa48d8f');
    	if(creep.reserveController(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);    
        }
    }
};


module.exports = roleReserver;