$(document).ready(function () {
    // Function that helps update the list of places
    function updatePlaces() {
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({}),
            success: function (data) {
                // this Clears the existing places
                $('.places').empty();

                // Looping  through the results and creating article tags for each place
                for (let place of data) {
                    let placeHTML = `
                        <article>
                            <div class="title_box">
                                <h2>${place.name}</h2>
                                <div class="price_by_night">$${place.price_by_night}</div>
                            </div>
                            <div class="information">
                                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                            </div>
                            <div class="description">
                                ${place.description}
                            </div>
                        </article>
                    `;
                    $('.places').append(placeHTML);
                }
            },
            error: function (error) {
                console.log('Error:', error);
            }
        });
    }

    // Calls the updatePlaces function to load places in page
    updatePlaces();

    let amenities = {};
    $('INPUT[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            amenities[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete amenities[$(this).attr('data-id')];
        }
        if (Object.values(amenities).length === 0) {
            $('.amenities H4').html('&nbsp;');
        } else {
            $('.amenities H4').text(Object.values(amenities).join(', '));
        }
    });
});