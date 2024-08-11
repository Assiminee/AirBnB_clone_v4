/* global $ */
const checked = () => {
  const selectedAmenities = {};
  $('.amenities input[type="checkbox"]').change(function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      selectedAmenities[`${id}`] = name;
    } else {
      delete selectedAmenities[`${id}`];
    }

    const amenities = Object.values(selectedAmenities).sort().join(', ');

    $('.amenities h4').text(amenities);
  });
};

const checkStatus = () => {
  const endpoint = 'http://0.0.0.0:5001/api/v1/status';

  fetch(endpoint, { method: 'GET', headers: { Accept: 'application/json', 'Content-Type': 'application/json' } })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK') {
        console.log(data.status);
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    })
    .catch(() => {
      $('div#api_status').removeClass('available');
    });
};

$(document).ready(function () {
  checked();
  checkStatus();
});
