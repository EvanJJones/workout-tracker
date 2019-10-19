// jquery asignments
const $signupButton = $('#signup-button');
const $username = $('#username-form');
const $password = $('#password');
const $password2 = $('#password2');

// posts to signup
function submitSignup() {
  const signupObject = {
    username: $username.val().trim(),
    password: $password.val().trim(),
    password2: $password2.val().trim(),
  };
  $.post('/register', signupObject)
    .then((data) => {
      submitLogin();
    })
    .catch((err) => {
      console.log(err);
    });
}

// logs in after signing up
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

// listener
$signupButton.on('click', submitSignup);
