var scout_headers={
  "Accept": "json",
  "Content-Type": "application/json"  
};
var platform_url="http://platform.scout-gps.ru:8081/"
scout_login = function(){
  console.log("scout_login...");
  //check in db with expire date
  var response=HTTP.call("POST", platform_url+"spic/auth/rest/Login", 
  { 
    headers: scout_headers,
    data : {  
      Login: "zy@smt-online.ru",
      Password: "zy@smt-online.ru",
      TimeStampUtc: '/Date(' + new Date().getTime() + ')/',
      TimeZoneOlsonId: 'Europe/Moscow',
      CultureName: 'ru-ru',
      UiCultureName: 'ru-ru'
    }
  });
  var token=response.data.SessionId;
  scout_headers.ScoutAuthorization=token; 
  console.log("Scout Token:"+token);
}

get_unit_id_by_gosnomer       = function  (gosnomer){
//  console.log("get_unit_id_by_gosnomer...");
  unit=units.findOne({Name: gosnomer});
  return unit.UnitId;
/*
  if (unit.length){
    console.log("found "+unit.UnitID);
    return unit.UnitID;
  }
  else 
  {
    reload_units();
    return null;
  }
*/
  }

reload_units=function(){
    scout_login();
    scout_units=HTTP.call("POST", platform_url+"spic/units/rest/getAllUnitsPaged", 
    { 
      headers: scout_headers,
      data : {
        Offset: 0,
        Count: 100
      }
    });
  
  scout_units=scout_units.data.Units;
  console.log("Fetched "+scout_units.length + " units from Scout");
  console.log
  scout_units.forEach(function(u){
    un=units.find({UnitID : u.UnitID}).fetch();
    console.log(un);
    if (un.length==0){
        units.insert(u);
    }
  });
}
//------------------------------------------------------------------------------------------------------------------  
get_discrete_statistics       = function  (unit_id,from,to){
    console.log("get_discrete_statistics...");
  url="http://php.gps-solutions.ru/spic/index.php?unit="+unit_id+"&from="+from+"&to="+to+"&stat=Discretesensor";
  console.log(url);
  response=HTTP.call("GET",url);
  statistics = response.content;

        statistics = statistics.replace(/\\\/Date\(/g, ''); // remove all  \/Date(
          statistics = statistics.replace(/\+\d{4}\)\\\//g, '');
          return JSON.parse(statistics);}
find_actuated_discrete_sensor = function  (stats, from){
  console.log("find_actuated_discrete_sensor");
          console.log('starting search ports..');
          sensors=stats.Sensors;
          var actuated_ports=[];
          unix=moment(from,"DD.MM.YYYY HH:mm:ss Z").unix();
          var port=0;
          port_triggered=null;
          sensors.forEach(function(s){
            var points=(s.Points).reverse();
            points.forEach(function(p,i){
             if ((p.Value==true && points[i+1]==false) || !points[i+1]){
              console.log("Событие по порту #"+port);
              actuated_ports.push(port);
            }
          });
            port++;
          });
          return actuated_ports;
        }