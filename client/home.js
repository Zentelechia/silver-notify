Template.ApplicationLayout.helpers({
	new : function() {return notifications.find({new : true}).count()},
	notification: function(){
		q={};
		if (Session.get("q")){
			q={text : {$regex : Session.get("q")||"",$options: 'i'}}
		}
		return notifications.find(q).fetch().reverse();
	},
	date: function(t) {return moment(t).format("HH:mm:ss DD.MM")},
});



Template.ApplicationLayout.events({
	'click .notifications_count' : function(e){
		$('#scout').hide();
		$('#tech').hide();
		$('#notifications').show();
	},
	'click .new_true' : function(e){
		id=e.currentTarget.id;
		notifications.update(id,{$set: {new : false}});
	},
	'click #home' : function(){
		$('#scout').show();
		$('#tech').hide();
		$('#notifications').hide();
	},
	'click #globe' : function(){
		$('#scout').hide();
		$('#notifications').hide();
		$('#tech').show();
	},
	'keyup #search': function(event) {
		Session.set("q",event.target.value);
	}

});
