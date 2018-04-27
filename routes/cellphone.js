var express = require('express');
var router = express.Router();
var path_ = require('path');
var path = __dirname + '/';
var cellphones = require('../db/cellphones')
var xmlize = require('js2xmlparser').parse;

/* GET users listing. */
router.get('/', function(req, res, next) {  
  // process.stdout.write(path_.join(__dirname,'../views/catalog.html'));  
  res.sendFile(path_.join(__dirname,'../views/catalog.html'));
  // res.send('respond with a resource');
});

router.get('/JSON',(req,res,next) => {
  let list = cellphones.getAll();
  
  // process.stdout.write(xmlize(JSON.stringify(list)));
  if(req.accepts('json','xml') == 'xml') res.send(xmlize("cellphone",JSON.parse(list)));
  else res.send(list);
}
);


router.get('/:model', function(req, res, next) {  
  let phone;
  if( ( phone = cellphones.phones.get(req.params.model) ) ) {
    res.status(200);
    if(req.accepts('json','xml') == 'xml') res.send(xmlize("cellphone",phone));
    else res.send(phone);
  } else {
    res.status(404);
  }
});



router.get('/:model/view', function(req, res, next) {    
  res.redirect(`/item.html?model=${req.params.model}`);
});



router.head('/:model', function(req, res, next) {
  let phone;
  if( ( phone = cellphones.phones.get(req.params.model) ) ) {
    res.status(200);
  } else {
    res.status(404);
  }
});


router.put('/:model',(req,res,next) =>{  
  if(cellphones.phones.set(req.params.model,req.body)){    
  }
});


router.post('/', function(req, res, next) {  
  if(cellphones.phones.set(req.body.model,req.body)){
    res.redirect('item.html');
  }else res.redirect('404.html');
});

router.delete('/:model', function(req, res, next) {
  if(cellphones.phones.delete(req.params.model)){
    res.sendStatus(204);    
  }else res.sendStatus(404);
});

module.exports = router;
