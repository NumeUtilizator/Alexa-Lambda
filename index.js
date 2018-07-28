/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');
const http = require('https');


var options = {
    "method": "POST",
    "hostname": "238c66c7e26578d7a2579136eefaa0ad.resindevice.io",
    "port": null,
    "path": "/lights/status",
    "headers": {
        "cache-control": "no-cache",
        "postman-token": "fe3c0b51-ddb1-c8e3-8168-2ba5145c2ff7"
    }
};



// Handler field index.handler
const handlers = {
    'LaunchRequest': function () {
        // This is triggered when users say "alexa, open gateway demo"
        this.emit(':ask', 'Welcome to Gateway Demo, would you like to control the led on raspberry Pi?')
    },
    'IsStillLovingMe': function (){
        this.emit(':tell', 'Yes, Mara  he will love you forever!')
    },
    'LightsToggle': function () {
        // This is triggered when users say "alexa, ask demo gateway  to turn the light on"
        var req = http.request(options, function (res) {
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