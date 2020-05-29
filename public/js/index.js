buttons = document.getElementsByClassName("reg-submit")

server_url = "127.0.0.1/3000"

function sendData(){
  console.log("Arrived within function");
}

for(i = 0; i < 2; i++){
  var button = buttons[i];
  button.addEventListener('click', function(e){
    e.preventDefault();
    button.setAttribute("method", server_url)
    var form = $(button).closest('form');
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

}
