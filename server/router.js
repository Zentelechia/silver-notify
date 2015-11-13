 Router.onBeforeAction(Iron.Router.bodyParser.urlencoded({
        extended: false
    }));
Router.route('/mail', function () {
  var res = this.response;
  	//console.log(this.response.body);
    notifications.insert({text : 'new', new : true, timestamp:  Date.now()});
    res.end('');
}, {where: 'server'});

 