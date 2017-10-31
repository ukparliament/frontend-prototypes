/*
  An example of running Pa11y on multiple URLS
  in parallel, with a configurable concurrency.
*/


// Require node modules
const
  async         = require('async'),
  fs            = require('fs'),
  pa11y         = require('pa11y'),
  htmlReporter  = require('../node_modules/pa11y/reporter/html'),
  config        = require('../config/pa11y.config.js');


// Create a Pa11y test runner
const test = pa11y({
  standard: config.standard, // set test standards
  ignore: config.ignore, // ignore WCAG msg
  log: config.log // log what's happening to the console
});


const concurrency = config.concurrency || 10; // set the concurrency here to run more tests in parallel

/*
  Use the async library to create a queue. This accepts a
  function to handle the URLs, and a concurrency.
  https://github.com/caolan/async
*/
const queue = async.queue(function(url, done) {
  /*
  	The queue function will be called with each URL. We
  	can then run the pa11y test function on them and call
  	`done` when we're finished to free up the queue
  */
  test.run(url, function(error, results) {
    if (error) {
      return console.error(error.message);
    }

    writeReportToHTML(htmlReporter.process(results, url), 'accessibility');
    done();
  });

}, concurrency);

/*
  Add a function that is triggered when the queue
  drains (it runs out of URLs to process)
*/
queue.drain = function() {
  console.log('All done!');
};

/*
  Lastly, push the URLs we wish to test onto the queue
*/
queue.push(config.urls);


function writeReportToHTML(htmlText, fileName){
  fs.appendFile('reports/' + fileName + '_report.html', htmlText, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log('Results added to reports/' + fileName + '_report.html');
  });
}
