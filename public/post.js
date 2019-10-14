// fields
const $distance = $('#distance');
const $minutes = $('#minutes');
const $seconds = $('#seconds');
const $weight = $('#weight');
const $reps = $('#reps');

// space to tell user info
const $alert = $('#alert');

// submit buttons
const $submitRun = $('#submit-run');
const $submitBike = $('#submit-bike');
const $submitWeight = $('#submit-weight');

function ajaxPost(route, object) {
  $.post(`/api/${route}`, object)
    .then((data) => {
      window.location.reload(true);
    })
    .catch((err) => {
      console.log(err);
    });
}

function postRun() {
  console.log('test');
  const distance = $distance.val().trim();
  const minutes = $minutes.val().trim();
  const seconds = $seconds.val().trim();

  if (isNaN(distance) || distance < 0) {
    $alert.text('The distance you entered is not valid');
  } else if (isNaN(minutes) || minutes < 0) {
    $alert.text('The minutes you entered are not valid');
  } else if (isNaN(seconds) || seconds < 0) {
    $alert.text('The seconds you entered are not valid');
  } else {
    const runObject = {
      distance,
      minutes,
      seconds,
    };

    ajaxPost('run', runObject);
  }
}

function postBike() {
  const distance = $distance.val().trim();
  const minutes = $minutes.val().trim();
  const seconds = $seconds.val().trim();

  if (isNaN(distance) || distance < 0) {
    $alert.text('The distance you entered is not valid');
  } else if (isNaN(minutes) || minutes < 0) {
    $alert.text('The minutes you entered are not valid');
  } else if (isNaN(seconds) || seconds < 0) {
    $alert.text('The seconds you entered are not valid');
  } else {
    const bikeObject = {
      distance,
      minutes,
      seconds,
    };

    ajaxPost('bike', bikeObject);
  }
}

function postWeight() {
  const weight = $weight.val().trim();
  const reps = $reps.val().trim();

  if (isNaN(weight) || weight < 1) {
    $alert.text('The weight you entered is not valid');
  } else if (isNaN(reps) || reps < 1) {
    $alert.text('The reps you entered are not valid');
  } else {
    const weightObject = {
      weight,
      reps,
    };

    ajaxPost('weight', weightObject);
  }
}

$submitRun.on('click', postRun);
$submitBike.on('click', postBike);
$submitWeight.on('click', postWeight);
