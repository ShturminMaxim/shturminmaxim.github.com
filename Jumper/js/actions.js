define(['./mediator'], function(mediator) {
var keys = {
	'37':'left',
	'38':'jump',
	'39':'right'
};
var keys_state = {
	'37':false,
	'38':false,
	'39':false
};
active_key = {};
$(document).bind("keyup keydown", function(e){
	var key = e.which;

	if(keys_state[key] !== undefined) {
		if(e.type === 'keydown') {
			//if(keys_state[key] !== true) {
				keys_state[key] = true;
				active_key[keys[key]] = true;
				mediator.publish('start-action', keys[key]);
			//}
		} else {
			keys_state[key] = false;
			delete active_key[keys[key]];
			mediator.publish('stop-action', keys[key]);
		}
	}
	//console.log(keys_state[key]);
	return false;
});

return {
	active_key : active_key
};

});