document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#loginForm').addEventListener('submit', onLogInSubmit);
});

function onLogInSubmit(e) {
  e.preventDefault();

  data = { "email": e.currentTarget[0].value, "password": e.currentTarget[1].value }

  $.ajax({
      type: "POST",
      url: 'http://localhost:3000/api/v1/users/login',
      data: JSON.stringify(data),
      dataType: JSON,
      error: function(response) {
          console.log(response);
          $('#info').html('<p>An error has occurred</p>');
      },
      success: function() {
          console.log(response);
          $('#info').html('<p>Success</p>');
      }
  });
}
