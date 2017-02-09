//TODO On page load, below script is executed.  Instead, send the request when user clicks button#flickr_search

//TODO Parse this data to get the info we need for displaying the photos
//TODO I would like to see a grid of the photos as small thumbnails since we want the page to load as quickly as possible
//TODO When the user clicks on a thumbnail, we should load the original photo for the user to see
//TODO IMPORTANT! This documentation will help you build the photo urls from the data response: https://www.flickr.com/services/api/misc.urls.html
//TODO I prefer when we show the original photo, we don't have to navigate away from the page and force the user to click the back button when done (hint: Ajax, Modal)
//EXTRA_CREDIT Make this look good!

// Flickr API documentation for flickr.photos.search request https://www.flickr.com/services/api/flickr.photos.search.html

$(document).ready(function() {

  var $searchInput = $('#flickr_query');
  var $searchButton = $('#flickr_search');

  // Search on submit
  $searchButton.click(function() {
    var searchText = $searchInput.val();
    searchRequest(searchText);
  })

  // Search on keypress "Enter"
  $searchInput.keypress(function(e){
    if (e.keyCode === 13) {
      var searchText = $searchInput.val();
      searchRequest(searchText);
    }
  });



  function searchRequest(query) {

      var API_KEY = "089063c49f6c8706a04b70f8a1f2abb2";
      var url = "https://api.flickr.com/services/rest/?" +
        "method=flickr.photos.search&" +
        "&text=" + query +
        "&content_type=1" +
        "&safe_search=1" +
        "&format=json" +
        "&jsoncallback=?" +
        "&api_key=" + API_KEY;

      $.ajax({
        url: url,
        type: "GET",
        dataType: 'jsonp',
        success: function(data) {
          var photosOutput = "";
          $.each(data.photos.photo,function(index, element) {
            photosOutput += '<a href="#" class="image show-fullsize">';
            photosOutput += '<div class="img-thumbnail"" style="background-image: url(https://farm' + element.farm
            + '.staticflickr.com/' + element.server + '/' + element.id
            + '_' + element.secret + '_t.jpg);"></div></a>';
          });

          $('#photos').html(photosOutput);
        }
      });

    } // End flickrSearch function

    // Modal Script

    $('#photos').on('click', 'a.show-fullsize', function() {
      var image = $(this).find("div").css('background-image');
      var imageUrl = image.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
      imageUrl = imageUrl.split('');
      imageUrl.splice((imageUrl.length - 5), 1, "b")
      imageUrl = imageUrl.join('');
      $('.imagepreview').attr('src', imageUrl);
      $('#imagemodal').modal('show');
    });


}) // End Document Ready Function
