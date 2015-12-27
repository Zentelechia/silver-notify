
Router.onBeforeAction(Iron.Router.bodyParser.urlencoded({
    extended: false
}));

Router.route('/mail', function () {
  var res = this.response;
  var req = this.request;
  

  var msg= {};  
  msg.new=true;
  msg.timestamp=Date.now();
  msg.message="Новое событие";
  message={};	


///  console.log(req.body["body-plain"]);

//  ok 1. Get Authorization token
//  ok 2. Find UnitId by Gosnomer (from mail)
//  ok 3. Get Discrete Statistics by period
//  4. Find actuated sensors
//  5. Get sensors names and messages
//  6. Make notification
  
try {
      console.log(req.body["body-plain"]);
      message=JSON.parse(req.body["body-plain"]);
      console.log(message);
      gosnomer=message.gosnomer;
      unit_id=get_unit_id_by_gosnomer(gosnomer);
      time_start=message.time_start;
      time_start="23.12.2015 11:32:38 (UTC+3)";
      to=moment(time_start,"DD.MM.YYYY HH:mm:ss Z");
      from=moment(time_start,"DD.MM.YYYY HH:mm:ss Z").subtract(60,'m');
      format_string=("YYYY-MM-DDThh:mm:ss.000");
      msg.text=message.message;        
      if(msg.message.search("тревожной")!=-1){
        stats=get_discrete_statistics(unit_id,from.format(format_string),to.format(format_string));
        console.log(stats);
        ports=find_actuated_discrete_sensor(stats, from.unix());
        if (ports.length>0){
          ports.forEach(function(pp){
              p=terminal_settings.findOne({code: "P"+pp});
              msg.text=p.Value;
              notifications.insert(msg);            
          });
        }
        else{
          notifications.insert(msg);
        }
      }
      console.log(port);
    //find_actuated_discrete_sensor(stats, from.unix());
 }
  catch(err){

    console.log("catch err:" + err);
 }
  res.end('');
}, {where: 'server'});
