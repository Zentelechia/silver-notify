Router.onBeforeAction(Iron.Router.bodyParser.urlencoded({
    extended: false
}));

Router.route('/mail', function () {
  var res = this.response;
  var req = this.request;
  
  	console.log(req.body);

    notifications.insert({text : req.body["body-plain"], new : true, timestamp:  Date.now()});
    res.end('');
}, {where: 'server'});

 