Template.settings.helpers({
	settings: function(){
		return terminal_settings.find({},{sort : {order : 1}});
	}
});

Template.settings.events({
	'focusout input' : function(event) {
		setting_code=event.currentTarget.id;
		setting_value=event.currentTarget.value
		Meteor.call("setting_change",setting_code, setting_value);		
	}

});