const constants = {
	HARVESTER: 'harvester',
	DRILLER: 'driller',
	TRANSPORTER: 'transporter',
	BUILDER: 'builder',
	REPAIRER: 'repairer',
	UPGRADER: 'upgrader',

	SPAWNPARTS: {
		harvester: [[WORK,CARRY,MOVE,MOVE],[WORK,WORK,CARRY,MOVE,MOVE]],
		driller: [[WORK,WORK,CARRY,MOVE],[WORK,WORK,WORK,CARRY,MOVE]]
	},

	/**************CONSOLE OUTPUT LEVELS*************/
	DEBUG:5,
	VERBOSE:4,
	INFO:3,
	WARN:2,
	ERROR:1,
	NONE:0
};
module.exports = constants;