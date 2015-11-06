/**
 *  A Jquery Extention that hooks into the events.chapamn.edu feed.
 *
 * Usage: $('#my-cool-feed').chapmanEventsFeed({url: 'https://events.chapman.edu?group_id=56'});
 *
 * This will fill in the #my-cool-feed
 */

(function( $ ){

  /**
   * The constructor that takes in an object of options.
   */
  ChapmanEventsFeed = function(options) {
    if (!options || !options.url) throw "ChapmanEventsFeed needs to have a url passed into the options object."
    this.$element = options.$element;
    this.url      = this.parseUrl(options.url);
  };


  /**
   * Converts the url passed in, into the url that we will make our ajax reqest to.
   */
  ChapmanEventsFeed.prototype.parseUrl = function(url) {
    var parser  = document.createElement('a');
    parser.href = url;
    parser.pathname += 'feed';
    return parser.href;
  };


  /**
   * Makes the ajax request to our endpoint.  This expects an html response.
   */
  ChapmanEventsFeed.prototype.fetchEvents = function(callback) {
    $.ajax({
      method:  'GET',
      url:     this.url,
      success: this.onSuccess.bind(this),
      error:   this.onError.bind(this)
    });
  };

  /**
   * The callback for when ajax was a success
   */
  ChapmanEventsFeed.prototype.onSuccess = function(data) {
    this.$element.html(data);
  };

  /**
   * The bacllback for when ajax encountered an error;
   */
  ChapmanEventsFeed.prototype.onError = function(message) {
    this.$element.html("<p>There was a problem loading events.</p>")
  };


  /**
   * The jQuery extention so that we can use this easily.
   */
  $.fn.chapmanEventsFeed = function(options) {
    options.$element = this;
    new ChapmanEventsFeed(options).fetchEvents();
    return this;
  };

})( jQuery );



/**
 * Runs on Document ready
 */
$(document).ready(function() {
  $('[data-chapman-events-feed]').each(function() {
    $(this).chapmanEventsFeed({url: $(this).data('chapman-events-feed')});
  });
});
