 //Brandon Lo CS290 Database Interactions and UI

var express = require("express");
var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var request = require('request');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8117);

//login information
//dateStrings is used to format the date better
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_lob',
  password        : '5012',
  database        : 'cs290_lob',
  dateStrings     : true
});

//reloads the table
app.get('/reset-table',function(req,res,next){
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function(err){
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT NOT NULL,"+
    "weight INT NOT NULL,"+
    "date DATE NOT NULL,"+
    "lbs BOOLEAN NOT NULL)";
    pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

//insert values into the table
//https://dev.mysql.com/doc/refman/5.7/en/insert.html
app.get('/insert',function(req,res,next){
  var context = {};
  console.log("test");
  console.log(req.query);
  pool.query("INSERT INTO workouts (name, reps, weight, date, lbs) VALUES (?,?,?,?,?)", [req.query.name,req.query.reps,req.query.weight,req.query.date,req.query.lbs], function(err, result){
    if(err){
      next(err);
      return;
    }
  });
  pool.query('SELECT id, name, reps, weight, date, lbs FROM workouts', function(err, rows, results){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.send(JSON.stringify(context));
  });
});

//get where all the information is grabbed from the workouts table
app.get('/',function(req,res,next){
  var context = {};
  pool.query('SELECT * FROM workouts', function(err, rows, fields){
    context.results = rows;
    res.render('home', context);
  });
});

//edit where it gets the information from the the row
//https://dev.mysql.com/doc/refman/5.7/en/select.html
app.get('/edit',function(req,res,next){
  var context = {};
  pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows[0];
    res.render('update', context);
  });
});

//update
//https://www.tutorialspoint.com/mysql/mysql-update-query.htm
app.get('/update',function(req,res,next){
  var context = {};

  pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
    return;
  }
  if(result.length == 1){
    var curVals = result[0];
    pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id = ?",
    [req.query.name || curVals.name, req.query.reps || curVals.reps, req.query.weight || curVals.weight, req.query.date || curVals.date, req.query.lbs || curVals.lbs, req.query.id], function(err, results){
      if(err){
        next(err);
      return;
    }
    pool.query('SELECT * FROM workouts', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      res.render('home', context);
        });
      });
    }
  });
});

//delete
//https://dev.mysql.com/doc/refman/5.7/en/delete.html
app.get('/delete',function(req,res,next){
  var context = {};
    pool.query("DELETE FROM workouts WHERE id=?", [req.query.id], function(err, result){
      if(err){
        next(err);
        return;
      }
    pool.query('SELECT * FROM workouts', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      res.send(JSON.stringify(rows));
  })
  });
});

//static
app.use(express.static(__dirname + '/public'));

//404 500
app.use(function(req,res){
  res.status(404);
  res.render('404.handlebars');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500.handlebars');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
