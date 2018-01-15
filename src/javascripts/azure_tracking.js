/**
 * Azure Application Insights Tracking
 */

UK_Parliament.azureTracking = function () {

  // Local variables
  var
    links = document.querySelectorAll('a[data-tracking="appInsights"]'),

    trackInsights = function () {
      // Create a dynamic event inside of AppInsights
      if (this && this.hasAttribute('data-type')) {
        appInsights.trackEvent(this.getAttribute('data-type'));
      }

      // search results
      if (this && this.hasAttribute('data-search-result')) {
        var resultPosition = this.getAttribute('data-search-result');
        appInsights.trackEvent('resultLinkClicked', { url: this.href }, { position: resultPosition });
      }
    };

  // Add eventListener
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', trackInsights, false);
  }

};

UK_Parliament.azureTracking();
