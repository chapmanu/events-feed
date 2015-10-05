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
    this.url = this.parseUrl(options.url);
  }


  /**
   * Converts the url passed in, into the url that we will make our ajax reqest to.
   */
  ChapmanEventsFeed.prototype.parseUrl = function(url) {
    var parser  = document.createElement('a');
    parser.href = url;
    parser.pathname += 'feed';
    return parser.href;
  }


  /**
   * Makes the ajax request to our endpoint.  This expects an html response.
   */
  ChapmanEventsFeed.prototype.fetchEvents = function(callback) {
    $.get(this.url, callback);
  }


  /**
   * The jQuery extention so that we can use this easily.
   */
  $.fn.chapmanEventsFeed = function(options) {
    var self = this;
    new ChapmanEventsFeed(options).fetchEvents(function(data) { self.html(data); });
    return this;
  };

})( jQuery );
