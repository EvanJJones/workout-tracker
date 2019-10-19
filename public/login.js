// jquery assignments
const $loginButton = $('#login-button');
const $username = $('#username-form');
const $password = $('#password');

// post to login route
function submitLogin() {
  const loginObject = { username: $username.val().trim(), password: $password.val().trim() };
  $.post('/login', loginObject)
    .then((data) => {
      window.location.replace('/');
    })
    .catch((err) => {
      console.log(err);
    });
}

// listener
$loginButton.on('click', submitLogin);
