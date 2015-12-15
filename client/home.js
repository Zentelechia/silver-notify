Template.ApplicationLayout.helpers({
	new : function() {return notifications.find({new : true}).count()},
	notification: function(){
		return notifications.find().fetch().reverse();
	},
	date: function(t) {return moment(t).format("HH:mm:ss DD.MM")},
});



Template.ApplicationLayout.events({
	'click .notifications_count' : function(e){
		$('#scout').hide();
		$('#zoho').hide();
		$('#notifications').show();
	},
	'click .new_true' : function(e){
		id=e.currentTarget.id;
		notifications.update(id,{$set: {new : false}});
	},
	'click #home' : function(){
		$('#scout').show();
		$('#zoho').hide();
		$('#notifications').hide();
	},
	'click #tech' : function(){
		$('#scout').hide();
		$('#notifications').hide();
		$('#zoho').show();
	}

});
