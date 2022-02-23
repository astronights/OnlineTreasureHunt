function authAdmin() {
  var msg = window.prompt("Please enter secret");
  if (msg != "") {
    window.location.href = "/error";
  }
}
