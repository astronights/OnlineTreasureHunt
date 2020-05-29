signup-button = document.getElementsByClassName("signup-submit")
login-button = document.getElementsByClassName("login-submit")

server_url = "127.0.0.1/3000"

function sendData(){
  console.log("Arrived within function");
}

signup-button.addEventListener('click', function(e){
  e.preventDefault();
  signup-button.setAttribute("method", server_url)
  var form = $(signup-button).closest('form');
  console.log(form.attr("name"))
  if(form.attr("name") == "signup"){
    form.setAttribute("action", server_url+"/signup");
  }
  else if(form.attr("name") == "login"){
    console.log(form)
    form.setAttribute("action", server_url+"/login");
  }
  form.submit();
})

login-button.addEventListener('click', function(e){
  e.preventDefault();
  login-button.setAttribute("method", server_url)
  var form = $(login-button).closest('form');
  console.log(form.attr("name"))
  if(form.attr("name") == "signup"){
    form.setAttribute("action", server_url+"/signup");
  }
  else if(form.attr("name") == "login"){
    console.log(form)
    form.setAttribute("action", server_url+"/login");
  }
  form.submit();
})
