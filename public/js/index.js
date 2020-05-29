$("#login-form").submit(function(e){
  e.preventDefault();
  var formData = ($(this).serializeJSON())
		$.ajax({
			url: '/login',
			type: 'POST',
			data: formData,
			success: function(res) {
        alert("Sign up successful. Please login to continue.");
        return(res);
			},
			error: function(res) {
				alert(res.responseJSON.message);
			}
		})
});

$("#signup-form").submit(function(e){
  e.preventDefault();
  var formData = ($(this).serializeJSON())
		$.ajax({
			url: '/signup',
			type: 'POST',
			data: formData,
			success: function(res) {
        alert("Login successful");
				return(res);
			},
			error: function(res) {
				alert(res.responseJSON.message);
			}
		})
});
