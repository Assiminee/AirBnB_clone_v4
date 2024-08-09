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

$(document).ready(checked);
