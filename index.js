
'use strict';
const Alexa = require('alexa-sdk');
const http = require('https');


var light = {
    "method": "POST",
    "hostname": "238c66c7e26578d7a2579136eefaa0ad.resindevice.io",
    "port": null,
    "path": "/lights/status",
    "headers": {
        "cache-control": "no-cache"
    }
};

var alertOn = {
    "method": "GET",
    "hostname": "238c66c7e26578d7a2579136eefaa0ad.resindevice.io",
    "port": null,
    "path": "/device/2",
    "headers": {
        "cache-control": "no-cache"
    }
};

var alertOff = {
    "method": "GET",
    "hostname": "238c66c7e26578d7a2579136eefaa0ad.resindevice.io",
    "port": null,
    "path": "/device/1",
    "headers": {
        "cache-control": "no-cache"
    }
};


// Handler field index.handler
const handlers = {
    'LaunchRequest': function () {
        // This is triggered when users say "alexa, open demo car"
        this.emit(':tell', 'I\'m sorry Bogdan, I\'m afraid I can\'t do that... Just joking with you, I\'m not HAL9000')
    },
    'SendAlert': function () {
        // This is triggered when users say "alexa, ask demo car to send alert"
        var req = http.request(alertOn, function (res) {
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
    'RevokeAlert': function () {
        // This is triggered when users say "alexa, ask demo car to cancel alert"
        var req = http.request(alertOff, function (res) {
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
    'CarLocate': function () {
        // This is triggered when users say "alexa, ask demo car where is it"
        let i = 0;
        const iMax = 100;
        for (; i < iMax; i++) {
            var req = http.request(light, function (res) {
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

        }
        this.emit(':tell', 'Ok')
    },
    'LightsToggle': function () {
        // This is triggered when users say "alexa, ask demo car  to turn the light on"
        var req = http.request(light, function (res) {
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
    'AMAZON.HelpIntent': function () {
        // This is triggered when users say "Help"

        //this.response.speak('Hello').cardReader('Title', 'Body text')
        //this.emit(':responseReady')

        //this.emit(':ask', 'How can I help?', 'You can say something like turn on the led')

        //this.response.speak('How can I help?').listen('You can say something like turn on the led')
        //this.emit(':responseReady')
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