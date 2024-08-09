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

  stat();
};

const stat = () => {
  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, (data, stat) => {
    console.log(data);
    console.log(stat);
  });
}

$(document).ready(checked);
