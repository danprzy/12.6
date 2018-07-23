$(document).ready(function() {
    var url = 'https://restcountries.eu/rest/v2/name/';
    var countriesList = $('#countries');

    $('#search').click(searchCountries);
    $(document).on('keypress', function(e) {
        if (e.which == 13) { //The “enter” key is represent by code “13”
            searchCountries();
        }
    });

    function searchCountries() {
        var countryName = $('#country-name').val(); // val() is used to get/replace input elements values in jQuery, alternative in JS is .value
        if (!countryName.length) countryName = 'Poland';
        $.ajax({
            url: url + countryName,
            method: 'GET',
            data: null,
            beforeSend: function() {
                countriesList.empty();
                $('#countries').text('Loading....');
            },

            success: showCountriesList,

            error: function() {
                countriesList.empty();
                $('#countries').text('Oops! Country doesn\'t\ exist. Please try again.')
            }
        });

        function showCountriesList(resp) {
            countriesList.empty();
            resp.forEach(function(item) {
                $('<li>').text(item.name).appendTo(countriesList);
                $('<p>').text('Capital: ' + item.capital).appendTo(countriesList);
                $('<p>').text('Population: ' + item.population).appendTo(countriesList);
                $('<p>').append('<img src="' + item.flag + '"></img>').appendTo(countriesList);
            });
        };
    };
});