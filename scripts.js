/* global $ */
/* global gapi */

//necessary globals
var stamps = [];
var counter = 0;

//google authorization schtuff
var CLIENT_ID = 'CLIENT_ID';

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
        spreadsheetId: 'spreadsheetID',
        range: 'range',
    }).then(function (response) {
        var range = response.result;
        if (range.values.length > 0) {
            for (var i = 0; i < range.values.length; i++) {
                var name = range.values[i][0];
                    var qty = range.values[i][1];
                    document.getElementById(name).innerHTML = qty;
                    stamps.push( [name , qty] );
                    format(name, qty);
            }
        }
    }, function (response) {
        console.log('Error: ' + response.result.error.message);
        });
}

//When add item button is clicked, add a row onto the form
function addItem(type) {
    if (type === "U") {
        counter++;
        $("#itemU").append('<div class="spacer"></div><div class="row"><div class="col-xs-5 col-xs-offset-0 col-sm-2 col-sm-offset-3"><label class="sr-only">Select Item </label><select class="form-control input-lg" name="uselect[' + counter + ']"><option>Choose:</option><option>db1444</option><option>db1854</option><option >db2264</option><option>db2273</option><option>db3679</option><option>m1444</option><option>m1854</option><option>m2264</option><option>m2273</option><option >m3679</option><option>vellum</option><option>trans</option><option>gloves</option></select></div><div class="col-xs-4 col-sm-2 col-sm-offset-1"><label class ="sr-only">Quantity Used</label><input type="number" class="form-control input-lg" name="uqty[' + counter  + ']" placeholder="Qty" value=""></div><div class ="col-xs-1 col-xs-offset-0 col-sm-1 col-sm-offset-2 rmv"><button type="button" class="btn btn-danger"><i class="fa fa-lg fa-times"></button></div></div>');
        remove();
    } else if (type === "S") {
        counter++;
        $("#itemS").append('<div class="spacer"></div><div class="row"><div class="col-xs-5 col-xs-offset-0 col-sm-2 col-sm-offset-3"><label class="sr-only">Select Item </label><select class="form-control input-lg"name="sselect[' + counter + ']"><option>Choose:</option><option>db1444</option><option>db1854</option><option >db2264</option><option>db2273</option><option>db3679</option><option>m1444</option><option>m1854</option><option>m2264</option><option>m2273</option><option >m3679</option><option>vellum</option><option>trans</option><option>gloves</option></select></div><div class="col-xs-4 col-sm-2 col-sm-offset-1"><label class ="sr-only">Quantity Used</label><input type="number" class="form-control input-lg" name="sqty[' + counter + ']" placeholder="Qty" value=""></div><div class ="col-xs-1 col-xs-offset-0 col-sm-1 col-sm-offset-2 rmv"><button type="button" class="btn btn-danger"><i class="fa fa-lg fa-times"></button></div></div>');
        remove(); 
    }
}

//if remove is clicked, remove that line
var remove = function() {
    $(".rmv").click(function() {
        $(this).parent().remove();
        counter--;
        if (counter < 1) {
            counter = 0;
        }
    });
};

//when used/stock buttons are clicked, hide buttons and display correct form
function toggleFormOn(type) {
        $('#usedToggle').toggle("slow");
        $('#stockToggle').toggle("slow");
        if (type === "U") {
            $('.used').toggle("slow");
        } else if (type === "S") {
            $('.stock').toggle("slow");
        }
        if (counter > 0) {
            for (var i = counter; i > 0; i--) {
                $('.rmv').trigger('click');
            }
        }
}

//functionality for counting used items
$("#addUsed").submit(function (event) {
    event.preventDefault();
    var values = $(this).serializeArray();
    var len = values.length;
    for (var a = 0; a < len; a++) {
        var name = values[a].value;
        var qtyused = values[a + 1].value;
        var spot = stamps.findIndex(function(ele) {
            return ele[0] === name;
        });
        var curr = stamps[spot];
        var num = Number(curr[1]) - Number(qtyused);
        stamps.splice(spot, 1, [name, num]);
        console.log(name, qtyused, spot, stamps[spot], stamps);
        a++;
    }
    update();
    document.getElementById("addUsed").reset();
    toggleFormOn('U');
});

//functionality for counting stocked items
$("#stockUsed").submit(function (event) {
    event.preventDefault();
    var values = $(this).serializeArray();
    var len = values.length;
    for (var a = 0; a < len; a++) {
        var name = values[a].value;
        var qtyused = values[a + 1].value;
        var spot = stamps.findIndex(function(ele) {
            return ele[0] === name;
        });
        var curr = stamps[spot];
        var num = Number(curr[1]) + Number(qtyused);
        stamps.splice(spot, 1, [name, num]);
        console.log(name, qtyused, spot, stamps[spot], stamps);
        a++;
    }
    update();
    document.getElementById("stockUsed").reset();
    toggleFormOn('S');
});

//function to update values and write to sheet
function update() {
    gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: 'spreadsheetID',
        range: 'range',
        valueInputOption: 'RAW',
        includeValuesInResponse: true,
        values: [
             [stamps[0][0], stamps[0][1]],
            [stamps[1][0], stamps[1][1]],
            [stamps[2][0], stamps[2][1]],
            [stamps[3][0], stamps[3][1]],
            [stamps[4][0], stamps[4][1]],
            [stamps[5][0], stamps[5][1]],
            [stamps[6][0], stamps[6][1]],
            [stamps[7][0], stamps[7][1]],
            [stamps[8][0], stamps[8][1]],
            [stamps[9][0], stamps[9][1]],
            [stamps[10][0], stamps[10][1]],
            [stamps[11][0], stamps[11][1]],
            [stamps[12][0], stamps[12][1]]
        ]
    }).then(function (response) {
        stamps = [];
        var range = response.result.updatedData;
        if (range.values.length > 0) {
            for (var i = 0; i < range.values.length; i++) {
                var name = range.values[i][0];
                    var qty = range.values[i][1];
                    document.getElementById(name).innerHTML = qty;
                    stamps.push( [name , qty] );
                    format(name, qty);
            }
        }
    }, function (reason) {
        console.log('Error: ' + reason.result.error.message);
        });
}

//allows toggle of ink cells to show if need to order or not
function toggleInks(type) {
    var ele = document.getElementById(type);
    if (ele.innerHTML == "Good") {
        ele.innerHTML = "Low";
        ele.style.backgroundColor = "red";
        ele.style.color = "white";
    } else if (ele.innerHTML == "Low") {
         ele.innerHTML = "Good";
        ele.style.backgroundColor = "white";
        ele.style.color = "black";
    }
}

//conditional formatting if values are too low
function format(name, val) {
    var ele = document.getElementById(name);
    switch(name) {
        case "db1444":
        case "db2273":
        case "db3679":
        case "m1444":
        case "m2273":
        case "m3679":
            if (val < 10) {
                ele.style.backgroundColor = "red";
                ele.style.color = "white";
            } else {
                ele.style.backgroundColor = "white";
                ele.style.color = "black";
            }
            break;
        case "db1854":
        case "db2264":
        case "m1854":
        case "m2264":
            if (val < 15) {
                ele.style.backgroundColor = "red";
                ele.style.color = "white";
            } else {
                ele.style.backgroundColor = "white";
                ele.style.color = "black";
            }
            break;
        case "vellum":
        case "trans":
        case "gloves":
            if (val < 25) {
                ele.style.backgroundColor = "red";
                ele.style.color = "white";
            } else {
                ele.style.backgroundColor = "white";
                ele.style.color = "black";
            }
            break;
    }
}
