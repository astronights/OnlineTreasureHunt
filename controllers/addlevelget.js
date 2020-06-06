var express = require('express');
var path = require('path');


module.exports = (req, res) => {
  if(req.session.addlevel){
    res.render(path.join(__dirname, "../views/addlevel.ejs"), {"success": req.session.addlevel.success});
  }
  else{
    res.render(path.join(__dirname, "../views/addlevel.ejs"), {"success": null});
  }
}
