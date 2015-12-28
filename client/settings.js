Template.settings.helpers({
	settings: function(){
		return terminal_settings.find({},{sort : {order : 1}});
	}
});

Template.settings.events({
	'focusout input.texter' : function(event) {
		setting_code=event.currentTarget.id;
		setting_value=event.currentTarget.value
		Meteor.call("setting_change",setting_code, setting_value);		
	},
	'change input.enabler' : function(event) {
		console.log(event.currentTarget);
		port_id=event.currentTarget.id;
		terminal_settings.update(port_id, {$set : {enable : (event.currentTarget.checked?true:false)}})

	}
});