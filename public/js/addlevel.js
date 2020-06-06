function authAdmin(){
  var msg = window.prompt("Please enter secret");
  if(msg != "zohoni"){
    window.location.href = "/error";
  }
};
