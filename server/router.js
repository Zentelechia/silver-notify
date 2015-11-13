Router.route('/mail', function () {
  var res = this.response;
    notifications.insert({text : 'new', new : true, timestamp:  Date.now()});
    res.end('');
}, {where: 'server'});

 