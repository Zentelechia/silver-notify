
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
  var message={};	


///  console.log(req.body["body-plain"]);

//  ok 1. Get Authorization token
//  ok 2. Find UnitId by Gosnomer (from mail)
//  ok 3. Get Discrete Statistics by period
//  4. Find actuated sensors
//  5. Get sensors names and messages
//  6. Make notification
  
      body=req.body["body-plain"];
      console.log(body);
try {
      message=JSON.parse(body);
      message.lat=message.lat.slice(0, -1);
      message.lan=message.lan.slice(0, -1);
      message.new=true;
      message.timestamp=Date.now();
      console.log(message.gosnomer);
      gosnomer=message.gosnomer;
      
      unit_id=get_unit_id_by_gosnomer(gosnomer);
      time_start=message.time_start;
//    time_start="23.12.2015 11:32:38 (UTC+3)";
      to=moment(time_start,"DD.MM.YYYY HH:mm:ss Z");
      from=moment(time_start,"DD.MM.YYYY HH:mm:ss Z").subtract(1,'h');
    
      format_string=("YYYY-MM-DDTHH:mm:ss.999");
    
      msg.text=message.message; 

      if(message.discrete){
        msg=message;
        stats=get_discrete_statistics(unit_id,from.format(format_string),to.format(format_string));
    

        console.log("Stats: "+stats);
        ports=find_actuated_discrete_sensor(stats, from.unix());
        console.log("Ports: "+ports);
        if (ports.length>0){
          ports.forEach(function(pp,i){
              p=terminal_settings.findOne({code: "P"+pp});
              if (p.enable){
                msg.text=p.value+" ["+msg.gosnomer+" "+to.format("DD.MM.YYYY HH:mm:ss")+"]";
                notifications.insert(msg);            
              }
          });
        }
        else{
          notifications.insert(message);
        }
      }
 }
  catch(err){
            console.log(err);
            message.text=req.body["body-plain"];
            notifications.insert(message);
  }
  res.end('');
}, {where: 'server'});
