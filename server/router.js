Router.onBeforeAction(Iron.Router.bodyParser.urlencoded({
    extended: false
}));

Router.route('/mail', function () {
  var res = this.response;
  var req = this.request;
  
  	//console.log(req.body);
  	
	console.log(req.body["body-plain"]);
  	msg=JSON.parse(req.body["body-plain"]);
    msg.text=msg.message;
    msg.timestamp=Date.now();
    msg.new=true;
    //notifications.insert({text : req.body["body-plain"], new : true, timestamp:  Date.now()});
    notifications.insert(msg);
    res.end('');
}, {where: 'server'});

 