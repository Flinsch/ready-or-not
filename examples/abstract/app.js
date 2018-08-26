
readyon.onReady(function() {
    console.log('This is also called everytime "ready" fires.');
});

readyon.onReadyOnce(function() {
    console.log('By the way, this is your ready-or-not config:');
    console.log(readyon.config);
    console.log('And here you have the complete interface:');
    console.log(readyon);
});
