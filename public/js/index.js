var signupButton = document.getElementById("signup-submit");
var loginButton = document.getElementById("login-submit");

function sendData(){
  console.log("Arrived within function");
}

signupButton.addEventListener('click', function(e){
  e.preventDefault();
  var form = $(document.getElementById('signup-form'));
  form[0].action = "/signup";
  form.submit();
})

loginButton.addEventListener('click', function(e){
  e.preventDefault();
  var form = $(document.getElementById('login-form'));
  $(form)
      .ajaxForm({
          url : '/login',
          dataType : 'json',
          success : function (response) {
              alert("The server says: " + response);
          }
      });
})
