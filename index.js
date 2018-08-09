'use strict';
const Alexa = require('alexa-sdk');
const http = require('https');


var options1 = {
    "method": "POST",
    "hostname": "238c66c7e26578d7a2579136eefaa0ad.resindevice.io",
    "port": null,
    "path": "/lights/status",
    "headers": {
        "cache-control": "no-cache"
    }
};

var options2 = {
    "method": "GET",
    "hostname": "238c66c7e26578d7a2579136eefaa0ad.resindevice.io",
    "port": null,
    "path": "/device/2",
    "headers": {
        "cache-control": "no-cache"
    }
};


// Handler field index.handler
const handlers = {
    'LaunchRequest': function () {
        // This is triggered when users say "alexa, open gateway demo"
        this.emit(':tell', 'Welcome to Demo Gateway, you can say something like Alexa ask demo gateway to turn on the light')
        //this.emit(':tell', 'You can say something like Alexa ask demo gateway to turn on the light')

    },
    'Alert': function () {
        // This is triggered when users say "alexa, ask demo gateway to alert car"
        var req = http.request(options2, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                var body = Buffer.concat(chunks);
                console.log(body.toString());
            });
        });

        req.end();


        this.emit(':tell', 'Ok')
    },
    'LightsToggle': function () {
        // This is triggered when users say "alexa, ask demo gateway  to turn the light on"
        var req = http.request(options1, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                var body = Buffer.concat(chunks);
                console.log(body.toString());
            });
        });

        req.end();


        this.emit(':tell', 'Ok')

        //this.response.speak('Hello').cardReader('Title', 'Body text')
        //this.emit(':responseReady')

        //this.emit(':ask', 'How can I help?', 'You can say something like turn on the led')

        //this.response.speak('How can I help?').listen('You can say something like turn on the led')
        //this.emit(':responseReady')
    },
    'AMAZON.HelpIntent': function () {
        // This is triggered when users say "Help"
    },
    'AMAZON.CancelIntent': function () {
        // This is triggered when users say "Cancel"
    },
    'AMAZON.StopIntent': function () {
        // This is triggered when users say "Stop"
    }
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};