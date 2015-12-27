Meteor.methods({
	
	sendSMS: function(phone){
		HTTP.get('http://smsc.ru/sys/send.php?login=zukuber&psw=smC&phones='+phone+'&mes=РўСЂРµРІРѕРіР°');
	},
	setting_change: function(code,value){
		s=terminal_settings.findOne({code : code});
		terminal_settings.update(s._id,{$set: {value : value}});
	}

});
