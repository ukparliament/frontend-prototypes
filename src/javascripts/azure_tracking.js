/**
 * Azure Application Insights Tracking
 */

UK_Parliament.azureTracking = function() {

  var
    links = document.querySelectorAll('a[data-tracking="appInsights"]'),

    trackInsights = function() {
      // Create a dynamic event inside of AppInsights
      if (this && this.hasAttribute('data-type')) {
        appInsights.trackEvent(this.getAttribute('data-type'));
      }

      // search results
      if (this && this.hasAttribute('data-search-result')) {
        var
          resultPosition = this.getAttribute('data-search-result'),
          resultHint = this.getAttribute('data-search-hint'),
          resultHintCount = this.getAttribute('data-search-hint-count');

        if (this.hasAttribute('data-search-hint-count')) {
          appInsights.trackEvent('resultLinkClicked',
            // String properties:
            { url: this.href, hint: resultHint },
            // Numeric metrics:
            { position: resultPosition, hintCount: resultHintCount });
        } else {
          appInsights.trackEvent('resultLinkClicked',
            // String properties:
            { url: this.href },
            // Numeric metrics:
            { position: resultPosition });
        }
      }
    };

  // Add eventListener
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', trackInsights, false);
  }

};

UK_Parliament.azureTracking();
