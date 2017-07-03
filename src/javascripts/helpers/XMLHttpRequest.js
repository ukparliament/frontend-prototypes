/**
 * Function to request get data and return the response.
 * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
 */

'use strict';

function ukp_getJsonFile(path, callback) {
	var request = new XMLHttpRequest();
	request.open('GET', path);
	request.onreadystatechange = function () {
		if (request.readyState === 4) {
			if (request.status === 200) {
				var response = JSON.parse(request.responseText);
				if (callback) {
					callback(response);
				}
			} else {
				console.log(request.statusText);
			}
		}
	};
	request.send();
}
