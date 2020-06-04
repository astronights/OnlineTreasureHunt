document.getElementById('signup-form').addEventListener('submit', function(e){
  e.preventDefault();
  var formData = new FormData(document.getElementById("signup-form"));
  formData.append("clientside", true);
  fetch('/signup', {
    method: "POST",
    body: formData
  }).then(function(res){
    return(res.json())
  }).then(function(resJSON){
      if(resJSON.account_made){
          $.redirect('index.ejs', resJSON);
      }
      else{
        $("#signup").on('load', function(){
          return
        }'#signup', data=resJSON);
      }
  })
});


document.getElementById('login-form').addEventListener('submit', function(e){
  e.preventDefault();
  fetch('/login', {
    method: "POST",
    body: new FormData(document.getElementById("login-form"))
  }).then(function(res){
    return(res.json())
  }).then(function(resJSON){
    console.log(resJSON);
  })
});
