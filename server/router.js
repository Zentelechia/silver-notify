
Router.onBeforeAction(Iron.Router.bodyParser.urlencoded({
    extended: false
}));

Router.route('/mail', function () {
  var res = this.response;
  var req = this.request;
  var msg= {};  

  msg.new=true;
  msg.timestamp=Date.now();
  	
	console.log(req.body["body-plain"]);

  try {
    body=JSON.parse(req.body["body-plain"]);
    msg.text=body.message;
  }
  catch(err){
    msg.text=req.body["body-plain"];
  }
  notifications.insert(msg);
  res.end('');

}, {where: 'server'});

 