Router.onBeforeAction(Iron.Router.bodyParser.urlencoded({
    extended: false
}));

Router.route('/mail', function () {
  var res = this.response;
  var req = this.request;
  
  	//console.log(req.body);
  	
  	msg=JSON.parse(req.body["body-plain"]);
	console.log(msg);
    //notifications.insert({text : req.body["body-plain"], new : true, timestamp:  Date.now()});
    msg.text=msg.message;
    msg.timestamp=Date.now();
    msg.new=true;
    notifications.insert(msg);
    res.end('');
}, {where: 'server'});

 