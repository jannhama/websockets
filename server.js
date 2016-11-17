'use strict';

/**
 * Simple websocket server for nodejs
 */

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 9982});

console.log('Waiting client connection in port 9982');

wss.on('connection', function (ws) {
    console.log((new Date()) + '  Connection accepted.' );
    ws.on('message', function (data, flags) {

        // if received data is in binary format
        if (flags.binary) {
            // let's make a copy of the data
            var buffer = new Uint8Array(data.length);
            for (var i = 0; i < (data.length); i++) {
                buffer[i] = data.readUInt8(i);
            }

            // Check if we got code 01
            if (buffer[0] == 0x01) {
                console.log('Command: we got command 1');
                sendTextAck(ws,'Command: we got command 1\n');
            }
            // Check if we got code 02
            else if (buffer[0] == 0x02) {
                console.log('Command: we got command 2');
                sendBinaryAck(ws,'Command: we got command 2');
                sendTextAck(ws,'Command: we got command 2\n');
            }
            else {
                console.log(' Command: Unknown' );
                sendTextAck(ws,'Command: Unknown command\n');
            }
        }
        // text content
        else {
            console.log('We got text data:');
            console.log(data);
            console.log('Let\'s send it back as JSON');
            var obj={'text': data};
            ws.send(JSON.stringify(obj));
        }
    });

});


function sendBinaryAck(aWs,aMessage) {
    console.log('Send binary ack');
    // let's send the message text as binary
    var buffer = Buffer.from(aMessage);
    aWs.send(buffer);
}

function sendTextAck(aWs,aText) {
    console.log('Send text ack');
    aWs.send(aText);
}
