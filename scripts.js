/* global $ */
/* global gapi */

//necessary globals
var stamps = [];

//google authorization schtuff
var CLIENT_ID = '894792189641-nchnp5fsr776ds0r0vbpojgbnmfvffb9.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
    gapi.auth.authorize(
        {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
        }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          loadSheetsApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
    gapi.auth.authorize(
        { client_id: CLIENT_ID, scope: SCOPES, immediate: false },
        handleAuthResult);
    return false;
}

function loadSheetsApi() {
    var discoveryUrl =
        'https://sheets.googleapis.com/$discovery/rest?version=v4';
    gapi.client.load(discoveryUrl).then(getData);
}

function getData() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1qnHMLUQRRWyQMMLWDyuKfRHcGVWMJzhNkorTnmzSbjk',
        range: 'forSite!A2:B14',
    }).then(function (response) {
        var range = response.result;
        if (range.values.length > 0) {
            for (var i = 0; i < range.values.length; i++) {
                    var name = range.values[i][0];
                    var qty = range.values[i][1];
                    document.getElementById(name).innerHTML = qty;
                    stamps.push([name, qty]);
            }
        }
    }, function (response) {
        console.log('Error: ' + response.result.error.message);
    });
}

function addItem(divName){
    var main = document.getElementById(divName);
    var clone = main.cloneNode(true);
    document.getElementById("addUsed").appendChild(clone);
}

