const $loginButton = $('#login-button');
const $username = $('#username-form');
const $password = $('#password');

function submitLogin() {
  console.log('test');
  const loginObject = { username: $username.val().trim(), password: $password.val().trim() };
  $.post('/login', loginObject)
    .then((data) => {
      window.location.replace('/');
    })
    .catch((err) => {
      console.log(err);
    });
}

$loginButton.on('click', submitLogin);
