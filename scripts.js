/* global $ */
/* global gapi */

//necessary globals
var stamps = [];
var counter = 1;

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

//actually get data from sheet and fill into display
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
/*
//dynamically add rows to forms for multiple entries
function addItem(divName){
    var main = document.getElementById(divName);
    var clone = main.cloneNode(true);
    document.getElementById("addUsed").appendChild(clone);
}
*/
function addItem(type) {
    if (type === "U") {
        $("#itemU").append('<div class="spacer"></div><div class="row"><div class="col-xs-6 col-xs-offset-0 col-md-2 col-md-offset-3"><label class="sr-only">Select Item</label><select class="form-control input-lg" name="uselect[' + counter + ']"><option>Choose:</option><option>db1444</option><option>db1854</option><option>db2264</option><option>db2273</option><option>db3679</option><option>m1444</option><option>m1854</option><option>m2264</option><option>m2273</option><option>m3679</option><option>vellum</option><option>trans</option><option>gloves</option></select></div><div class="col-xs-4 col-md-1"><label class="sr-only">Quantity Used</label><input type="number" class="form-control input-lg" name="uqty[' + counter  + ']" placeholder="Qty" value=""></div><div class="col-xs-1 col-xs-offset-0 col-md-2 col-md-offset-2 rmv"><button type="button" class="btn btn-danger"><i class="fa fa-lg fa-times"></button></div></div>');
        counter++;
        remove();
    } else if (type === "S") {
        $("#itemS").append('<div class="spacer"></div><div class="row"><div class="col-xs-6 col-xs-offset-0 col-md-2 col-md-offset-3"><label class="sr-only">Select Item</label><select class="form-control input-lg"name="sselect[' + counter + ']"><option>Choose:</option><option>db1444</option><option>db1854</option><option>db2264</option><option>db2273</option><option>db3679</option><option>m1444</option><option>m1854</option><option>m2264</option><option>m2273</option><option>m3679</option><option>vellum</option><option>trans</option><option>gloves</option></select></div><div class="col-xs-4 col-md-1"><label class="sr-only">Quantity Used</label><input type="number" class="form-control input-lg" name="sqty[' + counter + ']" placeholder="Qty" value=""></div><div class="col-xs-1 col-xs-offset-0 col-md-2  col-md-offset-2 rmv"><button type="button" class="btn btn-danger"><i class="fa fa-lg fa-times"></button></div></div>');
        counter++; 
        remove(); 
    }
}

var remove = function() {
    $(".rmv").click(function() {
        $(this).parent().remove();
        counter--;
        if (counter < 1) {
            counter = 1;
        }
    });
};

function toggleFormOn(type) {
        $('#usedToggle').toggle("slow");
        $('#stockToggle').toggle("slow");
        if (type === "U") {
            $('.used').toggle("slow");
        } else if (type === "S") {
            $('.stock').toggle("slow");
        }
}

function dataSubmit(type) {
    if (type === "used") {
        for (var a = 0; a < counter; a++) {
            var select = $("addUsed").uselect[counter].options[Item].text;
            var spot = stamps.indexOf(select);
            stamps[spot][1] -= $("addUsed").uqty[counter].value;
        }
        counter = 1;
        alert(stamps);
    } else if (type === "stock") {
        for (var a = 0; a < counter; a++) {
            var select = $("stockUsed").sselect[counter].options[Item].text;
            var spot = stamps.indexOf(select);
            stamps[spot][1] += $("stockUsed").sqty[counter].value;
        }
        counter = 1;
        alert(stamps);
    }
}
