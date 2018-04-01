'use strict';

module.exports = function(app) {
var Client       = require('./models/client');


   app.get('/client/:clientId', function(req, res) {
        var clientid = req.params.clientId;
        /*if (!req.secure) {
            var secureUrl = "https://" + req.headers['host'] + req.url;
            res.writeHead(301, { "Location": secureUrl });
            res.end();
            return;
        }*/
        //let users = db.collection('clients');
        //var arr = users.find();
        //console.log("ARR"+arr);
        Client.find({'id':clientid}, function(err, game) {
          console.log(game);
          res.status(200).send(game)
            /*res.render('profilexml.ejs', {
                user: req.user,
                game: game
            });*/
        });
    });
   
    app.post('/client/', function(req, res) {
        var client = req.body.client;
        console.log(req.body);
        console.log(client.name);
        var newclient = new Client();

      newclient.name = client.name;
      newclient.month = client.month;
      newclient.total_charges = client.total_charges;
      newclient.recent_pmt_amt = client.recent_pmt_amt;
      newclient.overall_balance = client.overall_balance;
      newclient.min_payment = client.min_payment;
      newclient.points_earned_month = client.points_earned_month;
      newclient.total_points_earned = client.total_points_earned;
      newclient.expense_distribution = client.expense_distribution;

      newclient.due_date = client.due_date;
      newclient.recent_pmt_date = client.recent_pmt_date;


          Client.find({},function(err, games) {
            var max = 0;
            for(var i=0;i<games.length;i++){
              console.log("GAME"+games[i].id);
              var id = games[i].id.split("_");
              if(parseInt(id[1]) > max){
                max = parseInt(id[1])
              }
              
            }
            console.log("MAX",max);
            max = max+1;


            newclient.id = "hdfc_"+max;
            console.log(newclient);
            newclient.save(function(err) {
              res.send(newclient.id);
            });
      

          //}).skip(count-1).limit(1);
          });

      //});



    });
   

    app.get('/random', function(req, res) {
        /*if (!req.secure) {
            var secureUrl = "https://" + req.headers['host'] + req.url;
            res.writeHead(301, { "Location": secureUrl });
            res.end();
            return;
        }*/
        //let users = db.collection('clients');
        //var arr = users.find();
        //console.log("ARR"+arr);
        /*Client.find({}, function(err, game) {
          console.log(game);
          N = game.length;
          R = Math.floor(Math.random() * N)
          res.status(200).send(game)
            res.render('profilexml.ejs', {
                user: req.user,
                game: game
            });
        });*/

        Client.count({}, function (err, count){
          console.log("NUMBER"+count);
          var r = Math.floor(Math.random() * count);
          console.log("Number",r);
          var randomElement = Client.find({},function(err, game) { 
            console.log(game);

            res.status(200).send(game);

          }).skip(r).limit(1);

        });

    });


}
