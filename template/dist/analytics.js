"use strict";
let logged;
console.log('Sending data...');
function sendAnalytics(data) {
    console.log(data);
    logged = true;
    logged = 'Max';
    console.log(logged);
}
sendAnalytics('The data');
