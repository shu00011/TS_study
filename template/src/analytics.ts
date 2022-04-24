let logged;

console.log('Sending data...');

function sendAnalytics(data: string) {
    console.log(data);
    logged = true;
    logged = 'Max';
    console.log(logged);
}

sendAnalytics('The data');