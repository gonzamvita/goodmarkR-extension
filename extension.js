
document.addEventListener('DOMContentLoaded', function () {
  if (localStorage["user_auth_token"] == null) {
    alert("not logged user or smth")
  } else {
    document.querySelector('#loginForm').addEventListener('submit', onLogInSubmit);
  }
});

function onLogInSubmit(e) {
  e.preventDefault();

  data = { "email": e.currentTarget[0].value, "password": e.currentTarget[1].value }

  $.ajax({
      type: "POST",
      url: 'http://localhost:3000/api/v1/users/sign_in',
      data: data,
      dataType: "JSON",
      error: function(response) {
          badLogin(response);
          console.log(response);
      },
      success: function(response) {
          successfulLogin(response);
          console.log(response);
      }
  });
}

function successfulLogin(response) {
  $('.js-login').html("<p>Logged in as " + response.name + "!</p>");
  storeTokenLocally(response.token);
  // displayExtensionMenu();
}

function badLogin(response) {
  $('.js-login').html("<p>Bad login credentials, I think...</p>");
}

function storeTokenLocally(token) {
  localStorage["user_auth_token"] = token;
}
