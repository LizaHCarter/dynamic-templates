'use strict';

var express = require('express');
var app = express();
var morgan = require('morgan');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.render('home');
});

app.get('/checkerboard', function(req, res){
  res.render('checkerboard');
});

app.get('/add/:x/:y/:z/:a', function(req, res){
  req.params.x *= 1;
  req.params.y *= 1;
  req.params.z *= 1;
  req.params.a *= 1;

  console.log(req.params, req.query);
  req.params.fontsize = req.query.fontsize;
  req.params.color = req.query.color;
  req.params.borderwidth = req.query.borderwidth;

  res.render('sum', req.params);
});

app.get('/sumlist/:nums', function(req, res){
  var nums = req.params.nums.split(',');

  nums = nums.map(function(n){
    return n * 1;
  });

  var sum = 0;
  for(var i = 0; i< nums.length; i++){
    sum += nums[i];
  }

  res.render('sumlist', {nums:nums, sum:sum, even:req.query.even, odd:req.query.odd});
});

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is now listening on PORT' + port);
});
