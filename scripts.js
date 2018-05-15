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
        var countryName = $('#country-name').val();
        if (!countryName.length) countryName = 'Poland';
        $.ajax({
            url: url + countryName,
            method: 'GET',
            success: showCountriesList
        });
    }
    /*
        function showCountriesList(resp) {
            countriesList.empty();
            resp.forEach(function(item) {
                $('<li>').text(item.name).appendTo(countriesList);
            });
        }
    */
    function showCountriesList(resp) {
        countriesList.empty();
        resp.forEach(function(item) {
            $('<li>').text(item.name).appendTo(countriesList);
            $('<p>').text('Capital: ' + item.capital).appendTo(countriesList);
            $('<p>').text('Population: ' + item.population).appendTo(countriesList);
            $('<p>').append('<img src="' + item.flag + '"></img>').appendTo(countriesList);
        });
    }

});