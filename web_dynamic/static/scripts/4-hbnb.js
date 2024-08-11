/* global $ */
const selectedAmenities = {};

const checked = () => {
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
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    })
    .catch(() => {
      $('#api_status').removeClass('available');
    });
};

const searchPlaces = (jsonData) => {
  const endpoint = 'http://0.0.0.0:5001/api/v1/places_search/';

  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  })
    .then(response => response.json())
    .then(data => {
      $('article').remove();
      
      data.forEach(obj => {
        const article = $('<article></article>').appendTo('.places');

        const titleBox = $('<div class="title_box"></div>').appendTo(article);
        titleBox.append(`<h2>${obj.name}</h2>`);
        titleBox.append(`<div class="price_by_night">${obj.price_by_night}</div>`);

        const information = $('<div class="information"></div>').appendTo(article);
        information.append(`<div class="max_guest">${obj.max_guest} ${obj.max_guest === 1 ? 'Guest' : 'Guests'}</div>`);
        information.append(`<div class="number_rooms">${obj.number_rooms} ${obj.number_rooms === 1 ? 'Bedroom' : 'Bedrooms'}</div>`);
        information.append(`<div class="number_bathrooms">${obj.number_bathrooms} ${obj.number_bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</div>`);

        article.append(`<div class="description">${obj.description}</div>`);
      });
    })
    .catch(() => {});
};

const getPlaces = () => {
  $('button').click(function() {
    const amenityIds = Object.keys(selectedAmenities);

    searchPlaces({"amenities": amenityIds});
  });
}

$(document).ready(function () {
  checked();
  checkStatus();
  searchPlaces({});
  getPlaces();
});
