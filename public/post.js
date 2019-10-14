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

function postRun(event) {
  console.log('test');
  const distance = $distance.val().trim();
  const minutes = $minutes.val().trim();
  const seconds = $seconds.val().trim();

  if (isNaN(distance) || distance < 1) {
    $alert.text('The distance you entered is not valid');
  } else if (isNaN(minutes) || minutes < 1) {
    $alert.text('The minutes you entered are not valid');
  } else if (isNaN(seconds) || seconds < 1) {
    $alert.text('The seconds you entered are not valid');
  } else {
    const runObject = {
      distance,
      minutes,
      seconds,
    };

    console.log(runObject);
    $.post('/api/run', runObject)
      .then((data) => {
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
$submitRun.on('click', postRun);
// $submitBike.on('click', postBike);
// $submitWeight.on('click', postWeight);
